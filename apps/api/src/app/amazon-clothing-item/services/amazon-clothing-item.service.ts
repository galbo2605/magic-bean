import { Injectable } from '@nestjs/common';
import { AmazonClothingItemEntity, IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { MongoRepository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AmazonClothingItemService {
	constructor(
		@InjectRepository(AmazonClothingItemEntity)
		private readonly amazonClothingItemRepository: MongoRepository<AmazonClothingItemEntity>,
	) { }
	getCols() {
		const cols: { id: string, name: string }[] = [];
		const keys = Object.getOwnPropertyNames(new AmazonClothingItemEntity());
		keys.forEach(key => {
			const id = key;
			const name = key.split('_').join(' ');
			cols.push({ id, name });
		});
		return cols;
	}

	async findAll(column: string = 'Created_At', direction: 'asc' | 'desc' = 'desc', page: number = 0, pageSize: number = 5, search: string = '', parent: boolean = true, record?: IAmazonClothingItem): Promise<[AmazonClothingItemEntity[], number]> {
		const cols = this.getCols();
		const $or = cols.reduce((acc, item) => {
			acc.push({ [item.id]: { $regex: search } });
			return acc;
		}, []);
		return await this.amazonClothingItemRepository.findAndCount({
			order: {
				[column]: direction.toLocaleUpperCase(),
			},
			take: +pageSize,
			skip: page * pageSize,
			where: {
				$or,
				Parent_Child: parent ? 'Parent' : 'Child',
				Parent_SKU: parent ? null : record.SKU
			},
		});
	}

	async createMany(amazonClothingItems: IAmazonClothingItem[]): Promise<string> {
		try {
			const newDate = new Date();
			// this.amazonClothingItemRepository.save(amazonClothingItems);
			const findItemsToUpdate: Promise<AmazonClothingItemEntity>[] = [];
			const itemsToCreateSKUMap: { [SKU: string]: boolean | IAmazonClothingItem } = {};
			for (let i = 0; i < amazonClothingItems.length; i++) {
				const amazonClothingItem = amazonClothingItems[i];
				const foundItem = this.amazonClothingItemRepository.findOne({
					SKU: amazonClothingItem.SKU
				});
				findItemsToUpdate.push(foundItem);
				itemsToCreateSKUMap[amazonClothingItem.SKU] = amazonClothingItem;
			}
			const updateItemsFound = await Promise.all(findItemsToUpdate);
			const itemsToUpdate: Promise<UpdateResult>[] = [];
			for (let i = 0; i < updateItemsFound.length; i++) {
				const updateItemFound = updateItemsFound[i];
				if (updateItemFound) {
					itemsToCreateSKUMap[updateItemFound.SKU] = false;
					updateItemFound.Last_Updated = newDate;
					const itemToUpdate = this.amazonClothingItemRepository.update({ SKU: updateItemFound.SKU }, updateItemFound);
					itemsToUpdate.push(itemToUpdate);
				}
			}

			const itemsToCreate: IAmazonClothingItem[] = [];
			for (const SKU in itemsToCreateSKUMap) {
				if (itemsToCreateSKUMap.hasOwnProperty(SKU)) {
					const itemToCreate = itemsToCreateSKUMap[SKU] as IAmazonClothingItem;
					if (itemToCreate) {
						itemToCreate.First_Created = newDate;
						itemsToCreate.push(itemToCreate);
					}
				}
			}
			await Promise.all(itemsToUpdate);
			await this.amazonClothingItemRepository.save(itemsToCreate);
			return 'success';
		} catch (error) {
			throw error;
		}
	}

	async create(amazonClothingItem: IAmazonClothingItem): Promise<AmazonClothingItemEntity> {
		try {
			amazonClothingItem.First_Created = new Date();
			return await this.amazonClothingItemRepository.save(amazonClothingItem);
		} catch (error) {
			throw error;
		}
	}

	async update(amazonClothingItem: AmazonClothingItemEntity): Promise<string> {
		const foundOne = await this.amazonClothingItemRepository.findOne({
			SKU: amazonClothingItem.SKU
		});
		for (const key in foundOne) {
			if (foundOne.hasOwnProperty(key)) {
				if (key !== 'UID') {
					foundOne[key] = amazonClothingItem[key];
				}
			}
		}
		await this.amazonClothingItemRepository.save(foundOne);
		return 'success';
	}

	async delete(uid: string): Promise<string> {
		const itemToDelete = await this.amazonClothingItemRepository.findOne(uid);
		await this.amazonClothingItemRepository.deleteMany({
			$and: [
				{ Parent_SKU: itemToDelete.SKU },
				{ Parent_Child: 'Child' }
			]
		});
		await this.amazonClothingItemRepository.deleteOne({ SKU: itemToDelete.SKU });
		return 'success';
	}

}

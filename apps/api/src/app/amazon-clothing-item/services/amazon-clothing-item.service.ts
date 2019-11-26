import { Injectable } from '@nestjs/common';
import { AmazonClothingItemEntity, IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { MongoRepository } from 'typeorm';
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

	async findAll(column: string = 'Created_At', direction: 'asc' | 'desc' = 'desc', page: number = 0, search: string = '', parent: boolean = true, record?: IAmazonClothingItem): Promise<[AmazonClothingItemEntity[], number]> {
		const cols = this.getCols();
		const $or = cols.reduce((acc, item) => {
			acc.push({ [item.id]: { $regex: search } });
			return acc;
		}, []);
		return await this.amazonClothingItemRepository.findAndCount({
			order: {
				[column]: direction.toLocaleUpperCase()
			},
			take: 5,
			skip: page * 5,
			where: {
				$or,
				Parent_Child: parent ? 'Parent' : 'Child',
				Parent_SKU: parent ? '' : record.SKU
			},
		});
	}

	async createMany(amazonClothingItems: IAmazonClothingItem[]): Promise<string> {
		try {
			for (let i = 0; i < amazonClothingItems.length; i++) {
				const amazonClothingItem = amazonClothingItems[i];
				await this.amazonClothingItemRepository.save(amazonClothingItem)
			}
			return 'success';
		} catch (error) {
			throw error;
		}
	}

	async create(amazonClothingItem: IAmazonClothingItem): Promise<AmazonClothingItemEntity> {
		try {
			return await this.amazonClothingItemRepository.save(amazonClothingItem);
		} catch (error) {
			throw error;
		}
	}

	async update(amazonClothingItem: AmazonClothingItemEntity): Promise<AmazonClothingItemEntity> {
		const foundOne = await this.amazonClothingItemRepository.findOne(amazonClothingItem.UID);
		for (const key in foundOne) {
			if (foundOne.hasOwnProperty(key)) {
				if (key !== 'UID') {
					foundOne[key] = amazonClothingItem[key];
				}
			}
		}
		return await this.amazonClothingItemRepository.save(foundOne);
	}

	async delete(amazonClothingItemID: string): Promise<void> {
		await this.amazonClothingItemRepository.delete(amazonClothingItemID);
	}

}

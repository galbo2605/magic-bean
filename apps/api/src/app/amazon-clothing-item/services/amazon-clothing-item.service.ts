import { Injectable } from '@nestjs/common';
import { AmazonClothingItemEntity, IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AmazonClothingItemService {
	constructor(
		@InjectRepository(AmazonClothingItemEntity)
		private readonly amazonClothingItemRepository: Repository<AmazonClothingItemEntity>,
	) { }

	async findAll(): Promise<[AmazonClothingItemEntity[], number]> {
		return await this.amazonClothingItemRepository.findAndCount();
	}

	async create(amazonClothingItem: IAmazonClothingItem): Promise<AmazonClothingItemEntity> {
		try {
			return await this.amazonClothingItemRepository.save(amazonClothingItem);
		} catch (error) {
			throw error;
		}
	}

	async update(amazonClothingItem: IAmazonClothingItem): Promise<AmazonClothingItemEntity> {
		const foundAmazonClothingItem: any = await this.amazonClothingItemRepository.findOne(amazonClothingItem.UID);
		this.setTodoValues(foundAmazonClothingItem, amazonClothingItem);
		return await this.amazonClothingItemRepository.save(foundAmazonClothingItem);
	}

	async delete(amazonClothingItemID: string): Promise<void> {
		await this.amazonClothingItemRepository.delete(amazonClothingItemID);
	}

	private setTodoValues(newAmazonClothingItem: IAmazonClothingItem, changedAmazonClothingItem: IAmazonClothingItem) {
		newAmazonClothingItem = { ...changedAmazonClothingItem };
	}

}

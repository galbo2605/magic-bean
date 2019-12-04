import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AmazonClothingItemService } from './services/amazon-clothing-item.service';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
interface IResponseWithCount {
	records: AmazonClothingItemEntity[];
	count: number;
};

@Controller('amazon-clothing-item')
export class AmazonClothingItemController {
	constructor(private amazonClothingItemSVC: AmazonClothingItemService) { }

	@Get('findAll')
	async findAll(
		@Query('column') column: string,
		@Query('direction') direction: 'asc' | 'desc',
		@Query('page') page: number,
		@Query('pageSize') pageSize: number,
		@Query('search') search: string,
	): Promise<IResponseWithCount> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll(column, direction, page, pageSize, search);
		return { records: amazonClothingItems, count };
	}
	@Post('getChildren')
	async findAllChildren(
		@Body() body: any,
		@Query('column') column: string,
		@Query('direction') direction: 'asc' | 'desc',
		@Query('page') page: number,
		@Query('pageSize') pageSize: number,
		@Query('search') search: string,
	): Promise<IResponseWithCount> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll(column, direction, page, pageSize, search, false, body);
		return { records: amazonClothingItems, count };
	}

	@Post('import')
	async import(@Body() body: any): Promise<any> {
		try {
			const message = await this.amazonClothingItemSVC.createMany(body);
			return { message };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	
	@Post('export')
	async export(@Body() body: any): Promise<AmazonClothingItemEntity[]> {
		try {
			const records = await this.amazonClothingItemSVC.findByDates(body.fromDate, body.toDate);
			return records;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	@Post('createOne')
	async createOne(@Body() body: any): Promise<AmazonClothingItemEntity> {
		try {
			const amazonClothingItem = await this.amazonClothingItemSVC.create(body);
			return amazonClothingItem;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	@Post('updateOne')
	async updateOne(@Body() body: any): Promise<any> {
		const message = await this.amazonClothingItemSVC.update(body);
		return { message };
	}

	@Post('deleteOne')
	async deleteOne(@Body() body: any): Promise<any> {
		const message = await this.amazonClothingItemSVC.delete(body.UID);
		return { message };
	}
}

import { Controller, Get, Res, Req, Post, Body, Query } from '@nestjs/common';
import { AmazonClothingItemService } from './services/amazon-clothing-item.service';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
@Controller('amazon-clothing-item')
export class AmazonClothingItemController {
	constructor(private amazonClothingItemSVC: AmazonClothingItemService) { }

	@Get('findAll')
	async findAll(
		@Query('column') column: string,
		@Query('direction') direction: 'asc' | 'desc',
		@Query('page') page: number,
		@Query('search') search: string,
	): Promise<AmazonClothingItemEntity[]> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll(column, direction, page, search);
		return amazonClothingItems;
	}
	@Post('getChildren')
	async findAllChildren(
		@Body() body: any,
		@Query('column') column: string,
		@Query('direction') direction: 'asc' | 'desc',
		@Query('page') page: number,
		@Query('search') search: string,
	): Promise<AmazonClothingItemEntity[]> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll(column, direction, page, search, false, body);
		return amazonClothingItems;
	}

	@Get('allCount')
	async allCount(@Req() req: Request): Promise<number> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll();
		return count;
	}

	@Post('import')
	async import(@Body() body: any): Promise<string> {
		try {
			const message = await this.amazonClothingItemSVC.createMany(body);
			return message;
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
	async updateOne(@Body() body: any): Promise<AmazonClothingItemEntity> {
		const amazonClothingItems = await this.amazonClothingItemSVC.update(body);
		return amazonClothingItems;
	}

	@Post('deleteOne')
	async deleteOne(@Body() body: any): Promise<string> {
		await this.amazonClothingItemSVC.delete(body.UID);
		return 'success';
	}
}

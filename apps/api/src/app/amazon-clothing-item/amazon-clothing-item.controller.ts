import { Controller, Get, Res, Req, Post, Body } from '@nestjs/common';
import { AmazonClothingItemService } from './services/amazon-clothing-item.service';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
@Controller('amazon-clothing-item')
export class AmazonClothingItemController {
	constructor(private amazonClothingItemSVC: AmazonClothingItemService) { }

	@Get('findAll')
	async findAll(@Req() req: Request): Promise<AmazonClothingItemEntity[]> {
		const [amazonClothingItems, count] = await this.amazonClothingItemSVC.findAll();
		return amazonClothingItems;
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
		await this.amazonClothingItemSVC.delete(body);
		return 'success';
	}
}

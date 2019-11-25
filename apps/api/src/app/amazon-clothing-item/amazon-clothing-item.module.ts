import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
import { AmazonClothingItemService } from './services/amazon-clothing-item.service';
import { AmazonClothingItemController } from './amazon-clothing-item.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([AmazonClothingItemEntity])
	],
	controllers: [
		AmazonClothingItemController
	],
	providers: [
		AmazonClothingItemService,
	],
})
export class AmazonClothingItemModule { }

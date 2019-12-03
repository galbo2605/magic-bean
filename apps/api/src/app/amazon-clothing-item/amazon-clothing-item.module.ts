import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
import { AmazonClothingItemService } from './services/amazon-clothing-item.service';
import { AmazonClothingItemController } from './amazon-clothing-item.controller';
import { AmazonClothingItemSubscriber } from './subscribers/amazon-clothing-item.subscriber';

@Module({
	imports: [
		TypeOrmModule.forFeature([AmazonClothingItemEntity])
	],
	controllers: [
		AmazonClothingItemController
	],
	providers: [
		AmazonClothingItemService,
		AmazonClothingItemSubscriber
	],
})
export class AmazonClothingItemModule { }

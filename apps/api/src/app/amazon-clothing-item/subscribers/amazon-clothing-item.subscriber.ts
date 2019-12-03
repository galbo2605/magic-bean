import { EntitySubscriberInterface, Connection, UpdateEvent, RemoveEvent, InsertEvent, EventSubscriber } from 'typeorm';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class AmazonClothingItemSubscriber implements EntitySubscriberInterface<AmazonClothingItemEntity> {
	constructor(@InjectConnection() readonly connection: Connection) {
		connection.subscribers.push(this);
	}

	listenTo(): typeof AmazonClothingItemEntity {
		return AmazonClothingItemEntity;
	}

	afterLoad(item: AmazonClothingItemEntity): void {
	}

	beforeRemove(item: RemoveEvent<AmazonClothingItemEntity>): void {
	}

	beforeInsert(item: InsertEvent<AmazonClothingItemEntity>): void {
	}

	beforeUpdate(item: UpdateEvent<AmazonClothingItemEntity>): void {
	}

}
import { EntitySubscriberInterface, Connection, UpdateEvent, RemoveEvent, InsertEvent, EventSubscriber } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class AppSubscriber implements EntitySubscriberInterface<any> {
	constructor(@InjectConnection() readonly connection: Connection) {
		connection.subscribers.push(this);
	}

	afterLoad(item: any): void {
		return item;
	}

	beforeRemove(item: RemoveEvent<any>): void {
	}

	beforeInsert(item: InsertEvent<any>): void {
		item.entity.First_Created = new Date();
	}

	beforeUpdate(item: UpdateEvent<any>): void {
		item.entity.Last_Updated = new Date();
	}

}
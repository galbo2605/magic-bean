import { EntitySubscriberInterface, Connection, UpdateEvent, RemoveEvent, InsertEvent, EventSubscriber } from 'typeorm';
import { FormManagementEntity } from '@magic-bean/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@EventSubscriber()
export class FormManagementSubscriber implements EntitySubscriberInterface<FormManagementEntity> {
	constructor(@InjectConnection() readonly connection: Connection) {
		connection.subscribers.push(this);
	}

	listenTo(): typeof FormManagementEntity {
		return FormManagementEntity;
	}

	afterLoad(item: FormManagementEntity): void {
	}

	beforeRemove(item: RemoveEvent<FormManagementEntity>): void {
	}

	beforeInsert(item: InsertEvent<FormManagementEntity>): void {
	}

	beforeUpdate(item: UpdateEvent<FormManagementEntity>): void {
	}

}
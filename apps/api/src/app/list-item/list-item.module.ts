import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '@magic-bean/api-interfaces';
import { ListItemService } from './services/list-item.service';
import { TodoItemGateway } from './list-item.gateway';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoItemEntity])
	],
	providers: [
		TodoItemGateway,
		ListItemService,
	],
})
export class ListItemModule { }

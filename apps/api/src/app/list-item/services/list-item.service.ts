import { Injectable } from '@nestjs/common';
import { TodoItemEntity } from '@magic-bean/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITodoItem } from '../interface/todoi-item.interface';

@Injectable()
export class ListItemService {
	constructor(
		@InjectRepository(TodoItemEntity)
		private readonly listItemRepository: Repository<TodoItemEntity>,
	) { }

	async findAll(): Promise<TodoItemEntity[]> {
		return await this.listItemRepository.find();
	}

	async create(todoItem: ITodoItem): Promise<TodoItemEntity> {
		const newTodoItem: any = new TodoItemEntity();
		this.setTodoValues(newTodoItem, todoItem);
		return await this.listItemRepository.save(newTodoItem);
	}

	async update(todoItem: ITodoItem): Promise<TodoItemEntity> {
		const foundTodoItem: any = await this.listItemRepository.findOne(todoItem.id);
		this.setTodoValues(foundTodoItem, todoItem);
		return await this.listItemRepository.save(foundTodoItem);
	}

	async delete(todoItemID: string): Promise<void> {
		await this.listItemRepository.delete(todoItemID);
	}

	private setTodoValues(newTodoItem: ITodoItem, cahngedTodoItem: ITodoItem) {
		newTodoItem.value = cahngedTodoItem.value;
		newTodoItem.checked = cahngedTodoItem.checked;
		newTodoItem.mode = cahngedTodoItem.mode;
	}

}

import { Injectable } from '@nestjs/common';
import { TodoItemEntity } from '@magic-bean/api-interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListItemService {
	constructor(
		@InjectRepository(TodoItemEntity)
		private readonly listItemRepository: Repository<TodoItemEntity>,
	) { }

	async findAll(): Promise<TodoItemEntity[]> {
		return await this.listItemRepository.find();
	}

	async create(todoItem: TodoItemEntity): Promise<TodoItemEntity> {
		const newTodoItem = new TodoItemEntity();
		this.setTodoValues(newTodoItem, todoItem);
		return await this.listItemRepository.save(newTodoItem);
	}

	async update(todoItem: TodoItemEntity): Promise<TodoItemEntity> {
		const foundTodoItem = await this.listItemRepository.findOne(todoItem.id);
		this.setTodoValues(foundTodoItem, todoItem);
		return await this.listItemRepository.save(foundTodoItem);
	}

	async delete(todoItemID: string): Promise<void> {
		await this.listItemRepository.delete(todoItemID);
	}

	private setTodoValues(newTodoItem: TodoItemEntity, cahngedTodoItem: TodoItemEntity) {
		newTodoItem.value = cahngedTodoItem.value;
		newTodoItem.checked = cahngedTodoItem.checked;
		newTodoItem.mode = cahngedTodoItem.mode;
	}

}

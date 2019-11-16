import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import * as io from 'socket.io-client';

import { ITodoItem } from '../interfaces/list-item.interface';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ListItemApiService {
	private socketIOURL = this.baseURI();
	private socket: SocketIOClient.Socket;

	private todoItems: ITodoItem[];
	public socketState$ = new Subject<ITodoItem[]>();

	constructor() {
		this.initSocket();
		this.socket.connect();
	}

	private baseURI(): string {
		const protocol = 'http';
		const host = environment.host;
		const port = '4000';
		return `${protocol}://${host}:${port}`;
	}

	private initSocket(): void {
		this.socket = io(this.socketIOURL);
		this.socket.on('connect', () => {
			console.log('CONNECTED!');
		});
		this.socket.on('disconnect', () => {
			console.log('DISCONNECTED!');
		});
		this.socket.on('create', (todoItem: ITodoItem) => {
			console.log('create', todoItem);
			this.todoItems.push(todoItem);
			this.socketState$.next(this.todoItems);
		});
		this.socket.on('read', tI => {
			this.todoItems = tI;
			this.socketState$.next(this.todoItems);
		});
		this.socket.on('update', (todoItem: ITodoItem) => {
			console.log('update', todoItem);
			todoItem.mode = 'read';
			const todoItemIndex = this.todoItems.findIndex(tI => tI.id === todoItem.id);
			this.todoItems[todoItemIndex] = todoItem;
			this.socketState$.next(this.todoItems);
		});
		this.socket.on('delete', (todoItemID: string) => {
			console.log('delete', todoItemID);
			this.todoItems = this.todoItems.filter(tI => tI.id !== todoItemID);
			this.socketState$.next(this.todoItems);
		});
	}

	public createListItem(todoItem: ITodoItem): void {
		this.socket.emit('create', todoItem);
	}

	public updateListItem(todoItem: ITodoItem): void {
		this.socket.emit('update', todoItem);
	}

	public deleteListItem(todoItem: ITodoItem): void {
		this.socket.emit('delete', todoItem.id);
	}

	public disconnect(): void {
		this.socket.disconnect();
	}
}

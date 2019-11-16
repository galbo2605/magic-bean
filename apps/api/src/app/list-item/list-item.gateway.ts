import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ITodoItem } from './interface/todoi-item.interface';
import { ListItemService } from './services/list-item.service';

@WebSocketGateway(4000)
export class TodoItemGateway implements OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server;

	constructor(private readonly listItemSVC: ListItemService) {
	}

	async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
		// tslint:disable-next-line: no-console
		console.log(client.id, 'connected');
		const todoItems = await this.listItemSVC.findAll();
		client.emit('read', todoItems);
	}

	async handleDisconnect(@ConnectedSocket() client: Socket): Promise<void> {
		// tslint:disable-next-line: no-console
		console.log(client.id, 'disconnected');
	}

	@SubscribeMessage('create')
	async onCreate(@MessageBody() todoItem: ITodoItem) {
		// tslint:disable-next-line: no-console
		console.log('created', todoItem);
		const createdTodoItem = await this.listItemSVC.create(todoItem);
		this.server.emit('create', createdTodoItem);
	}

	@SubscribeMessage('update')
	async onUpdate(@MessageBody() todoItem: ITodoItem, @ConnectedSocket() client: Socket) {
		// tslint:disable-next-line: no-console
		console.log('updated', todoItem);
		const updatedTodoItem = await this.listItemSVC.update(todoItem);
		client.broadcast.emit('update', updatedTodoItem);
	}

	@SubscribeMessage('delete')
	async onDelete(@MessageBody() todoItemID: string, @ConnectedSocket() client: Socket) {
		// tslint:disable-next-line: no-console
		console.log('deleted', todoItemID);
		await this.listItemSVC.delete(todoItemID);
		this.server.emit('delete', todoItemID);
	}

}

import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material';
import { Subject } from 'rxjs';

import { ITodoItem } from '../../interfaces/list-item.interface';
import { IDispatchAction } from '../../interfaces/dispatch-action.interface';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnChanges {
	formGroup: FormGroup = new FormGroup({});
	@Input() todoItems: ITodoItem[];
	@Output('action') dispatchAction = new Subject<IDispatchAction>();

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		this.todoItems.forEach(todoItem => {
			this.formGroup.addControl(todoItem.id, new FormControl(todoItem.value));
		});
	}

	onAdd(): void {
		const itemId = Date.now().toString();
		const todoItem: ITodoItem = {
			id: itemId,
			checked: false,
			mode: 'read',
			value: ''
		};
		this.dispatchAction.next({ type: 'create', payload: todoItem });
	}

	onInput(id: string): void {
		const todoItemValue = this.formGroup.controls[id].value;
		const todoItem = this.todoItems.find(tI => tI.id === id);
		todoItem.value = todoItemValue;

		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}

	onCancel(todoItem: ITodoItem): void {
		todoItem.mode = 'read';
	}

	onEdit(todoItem: ITodoItem): void {
		if (!this.formGroup.controls[todoItem.id]) {
			this.formGroup.addControl(todoItem.id, new FormControl(''));
		}
		todoItem.mode = 'update';
		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}

	onDelete(todoItem: ITodoItem): void {
		this.dispatchAction.next({ type: 'delete', payload: todoItem });
	}

	onSelection(option: MatListOption, todoItem: ITodoItem): void {
		todoItem.checked = option.selected;
		this.dispatchAction.next({ type: 'update', payload: todoItem });
	}
}

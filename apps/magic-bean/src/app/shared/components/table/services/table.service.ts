import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAction } from '../../../interfaces/action.interface';
import { IRequest } from '../../../interfaces/request.interface';
import { ITableAction } from '../interfaces/table-action.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
	public tableState$ = new Subject<ITableAction>();

	constructor() { }
	private tableAction(type: string, payload: any, tableName: string): void {
		this.tableState$.next({ type, payload, tableName })
	}

	readRows(request?: IRequest, tableName?: string): void {
		const payload = { request };
		this.tableAction('readRows', payload, tableName);
	}

	insertRow(insertdRow: any, tableName?: string): void {
		const payload = { insertdRow };
		this.tableAction('insertRow', payload, tableName);
	}

	updateRow(key: string, value: any, updatedRow: any, tableName?: string): void {
		const payload = { key, value, updatedRow };
		this.tableAction('updateRow', payload, tableName);
	}

	deleteRow(key: string, value: any, deleteRow: any, tableName?: string): void {
		const payload = { key, value, deleteRow };
		this.tableAction('deleteRow', payload, tableName);
	}
}
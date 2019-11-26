import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAction } from '../../../interfaces/action.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
	public tableState$ = new Subject<IAction>();

	constructor() { }
	private tableAction(type: string, payload: any): void {
		this.tableState$.next({ type, payload })
	}

	updateRow(key: string, value: any, updatedRow: any): void {
		const payload = { key, value, updatedRow };
		this.tableAction('updateRow', payload);
	}

	deleteRow(key: string, value: any, deleteRow: any) {
		const payload = { key, value, deleteRow };
		this.tableAction('deleteRow', payload);
	}
}
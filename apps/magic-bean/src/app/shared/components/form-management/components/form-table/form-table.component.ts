import { Component } from '@angular/core';
import { IRequest } from '../../../../interfaces/request.interface';
import { EMethod } from '../../../../enums/method.enum.';
import { ITableActionItems } from '../../../table/interfaces/table-action-items.interfaces';
import { IAction } from '../../../../interfaces/action.interface';

@Component({
	selector: 'magic-bean-form-table',
	templateUrl: './form-table.component.html',
	styleUrls: ['./form-table.component.scss']
})
export class FormTableComponent {

	colRequest: IRequest = {
		path: 'form-cols',
		method: EMethod.GET
	};
	dataRequest: IRequest = {
		path: 'form-management/findAll',
		method: EMethod.GET
	};
	actionItems: ITableActionItems[] = [
		{ icon: 'edit', label: 'Edit', color: 'primary', type: 'edit' },
		{ icon: 'delete', label: 'Delete', color: 'warn', type: 'delete' }
	];

	actions(action?: IAction, tableName?: string): void {
		console.log(tableName, action);
	}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IColumns } from '../shared/interfaces/column.interface';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { Observable } from 'rxjs';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog } from '@angular/material';
import { take, combineLatest, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { TestFormComponent } from '../test-form/test-form.component';
import { TableService } from '../shared/components/table/services/table.service';
import { ITableActionItems } from '../shared/components/table/interfaces/table-action-items.interfaces';
import { SpeardSheetService } from '../shared/services/spreadsheet.service';
import { IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { TestService } from './services/test.service';
import { ITableAction } from '../shared/components/table/interfaces/table-action.interface';

@Component({
	selector: 'magic-bean-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
	columns$: Observable<IColumns[]>;
	colRequest: IRequest = {
		path: 'cols',
		method: EMethod.GET
	};
	dataSource$: Observable<any[]>;
	dataRequest: IRequest = {
		path: 'amazon-clothing-item/findAll',
		method: EMethod.GET
	};
	childrenDataRequest: IRequest = {
		path: 'amazon-clothing-item/getChildren',
		method: EMethod.POST,
	};
	dataCount$: Observable<number>;
	actionItems: ITableActionItems[] = [
		{ icon: 'expand', label: 'Expand', color: 'accent', type: 'expand' },
		{ icon: 'edit', label: 'Edit', color: 'primary', type: 'edit' },
		{ icon: 'delete', label: 'Delete', color: 'warn', type: 'delete' }
	];
	childActionItems: ITableActionItems[] = this.actionItems.filter(actionItem => actionItem.type !== 'expand');;

	constructor(private apiReqSVC: ApiRequestService,
		private dialog: MatDialog,
		private testService: TestService,
		private tableService: TableService,
		private speardSheetSVC: SpeardSheetService) { }

	ngOnInit() {
		this.columns$ = this.apiReqSVC.request(this.colRequest);
		this.dataSource$ = this.apiReqSVC.request(this.dataRequest);
		const dataCountRequest: IRequest = {
			path: 'amazon-clothing-item/allCount',
			method: EMethod.GET
		};
		this.dataCount$ = this.apiReqSVC.request(dataCountRequest);
	}

	actions(action?: IAction, tableName?: string): void {
		console.log(action);
		switch (action.type) {
			case 'edit':
			case 'Form Dialog':
				const dialog = this.dialog.open(TestFormComponent, {
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 100px)',
					data: action.payload,
					disableClose: true,
				});
				dialog.afterClosed().pipe(take(1)).subscribe(res => {
					console.log(`Dialog result`, res);
					switch (res.type) {
						case 'save':
							const saveType = action.type === 'edit' ? 'updateOne' : 'createOne';
							this.testService.update(res.payload, tableName);
							break;
						default:
							break;
					}
				});
				break;
			case 'delete':
				this.testService.delete(action.payload, tableName);
				break;
			case 'expand':
				this.childrenDataRequest.body = action.payload;
				break;
			case 'import': {
				const file = action.payload;
				this.speardSheetSVC.getDataFromFile(file).pipe(
					switchMap(data => {
						const saveRequest: IRequest = {
							path: 'amazon-clothing-item/import',
							method: EMethod.POST,
							body: data
						};
						return this.apiReqSVC.request(saveRequest);
					}),
					take(1)
				).subscribe(res1 => {
					console.log('api response: ', res1);
				});
			} break;
			case 'Export Excel':
				this.speardSheetSVC.export();
				break;
		}
	}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog } from '@angular/material';
import { take, switchMap } from 'rxjs/operators';
import { TestFormComponent } from '../test-form/test-form.component';
import { TableService } from '../shared/components/table/services/table.service';
import { ITableActionItems } from '../shared/components/table/interfaces/table-action-items.interfaces';
import { SpeardSheetService } from '../shared/services/spreadsheet.service';
import { TestService } from './services/test.service';

@Component({
	selector: 'magic-bean-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
	colRequest: IRequest = {
		path: 'cols',
		method: EMethod.GET
	};
	dataRequest: IRequest = {
		path: 'amazon-clothing-item/findAll',
		method: EMethod.GET
	};
	childrenDataRequest: IRequest = {
		path: 'amazon-clothing-item/getChildren',
		method: EMethod.POST,
	};
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
				this.tableService.isLoadingResults$.next({ parentTable: true });
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
					this.tableService.readRows(null, 'parentTable');
				});
			} break;
			case 'Export Excel':
				this.speardSheetSVC.export();
				break;
		}
	}
}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IColumns } from '../shared/interfaces/column.interface';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { Observable } from 'rxjs';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog } from '@angular/material';
import { take, map } from 'rxjs/operators';
import { TestFormComponent } from '../test-form/test-form.component';
import { TableService } from '../shared/components/table/services/table.service';
import { ITableActionItems } from '../shared/components/table/interfaces/table-action-items.interfaces';

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
	dataCount$: Observable<number>;
	actionItems: ITableActionItems[] = [
		{ icon: 'expand', label: 'Expand', color: 'primary', type: 'expand' },
		{ icon: 'edit', label: 'Edit', color: 'primary', type: 'edit' },
		{ icon: 'delete', label: 'Delete', color: 'warn', type: 'delete' }
	];
	constructor(private cDR: ChangeDetectorRef ,private apiReqSVC: ApiRequestService, private dialog: MatDialog, private tableService: TableService) { }

	ngOnInit() {
		this.columns$ = this.apiReqSVC.request(this.colRequest);
		this.dataSource$ = this.apiReqSVC.request(this.dataRequest);
		const dataCountRequest: IRequest = {
			path: 'amazon-clothing-item/allCount',
			method: EMethod.GET
		};
		this.dataCount$ = this.apiReqSVC.request(dataCountRequest);
	}

	actions(action?: IAction): void {
		console.log(action);
		switch (action.type) {
			case 'Form Dialog':
				const dialog = this.dialog.open(TestFormComponent, {
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 100px)',
					data: {
						test: 'hello world'
					},
					disableClose: true,
				});
				dialog.afterClosed().pipe(take(1)).subscribe(res => {
					console.log(`Dialog result`, res);
					switch (res.type) {
						case 'save':
							const saveRequest: IRequest = {
								path: 'amazon-clothing-item/createOne',
								method: EMethod.POST,
								body: res.payload
							};
							this.apiReqSVC.request(saveRequest).pipe(take(1)).subscribe(res1 => {
								console.log('api response: ', res1);
							});
							break;
						default:
							break;
					}
				});
				break;
			case 'edit':
				const dialog2 = this.dialog.open(TestFormComponent, {
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 100px)',
					data: action.payload,
					disableClose: true,
				});
				dialog2.afterClosed().pipe(take(1)).subscribe(res => {
					console.log(`Dialog result`, res);
					switch (res.type) {
						case 'save':
							const saveRequest: IRequest = {
								path: 'amazon-clothing-item/updateOne',
								method: EMethod.POST,
								body: res.payload
							};
							this.apiReqSVC.request(saveRequest).pipe(take(1)).subscribe(res1 => {
								console.log('api response: ', res1);
								this.dataSource$ = this.dataSource$.pipe(map(records => {
									let findOne = records.find(record => record.UID === res1.UID);
									findOne = res1;
									return records;
								}));
								this.cDR.detectChanges();
							});
							break;
						default:
							break;
					}
				});
				break;
			case 'delete':
				const deleteRequest: IRequest = {
					path: 'amazon-clothing-item/deleteOne',
					method: EMethod.POST,
					body: action.payload
				};
				this.apiReqSVC.request(deleteRequest).pipe(take(1)).subscribe(res => {
					console.log('api response: ', res);
					this.dataSource$ = this.dataSource$.pipe(map(records => {
						return records.filter(record => record.UID !== action.payload.UID);
					}));
					this.cDR.detectChanges();
				});
				break;
		}
	}

}

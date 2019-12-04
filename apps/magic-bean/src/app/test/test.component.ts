import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
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
	childActionItems: ITableActionItems[] = this.actionItems.filter(actionItem => actionItem.type !== 'expand');

	constructor(private apiReqSVC: ApiRequestService,
		private dialog: MatDialog,
		private bottomSheet: MatBottomSheet,
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
							const saveType = action.type === 'edit' ? 'update' : 'create';
							this.testService[saveType](res.payload, tableName);
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
			case 'Export':
				this.bottomSheet.open(ExportComponent).afterDismissed().pipe(
					take(1)
				).subscribe(exportDates => {
					if (exportDates) {
						const { fromDate, toDate } = exportDates;
						this.testService.getImportRecords(fromDate, toDate).pipe(
							take(1)
						).subscribe(res => {
							this.speardSheetSVC.export(res, `Magic Bean Sheet - ${(<Date>fromDate).toDateString()} - ${(<Date>toDate).toDateString()}`);
						});
					}
				});
				break;
		}
	}
}
@Component({
	selector: 'magic-bean-bottom-sheet-overview-example-sheet',
	template: `<mat-form-field>
						<input matInput
								#fromDateInput
								[matDatepicker]="fromDate"
								[max]="toDateValue"
								(dateInput)="onDateChange('max', $event.value)"
								placeholder="From Date"
								disabled>
						<mat-datepicker-toggle matSuffix
													[for]="fromDate"></mat-datepicker-toggle>
						<mat-datepicker #fromDate
											disabled="false"></mat-datepicker>
					</mat-form-field>
					<mat-form-field>
						<input matInput
								#toDateInput
								[min]="fromDateValue"
								[matDatepicker]="toDate"
								(dateInput)="onDateChange('min', $event.value)"
								placeholder="To Date"
								disabled>
						<mat-datepicker-toggle matSuffix
													[for]="toDate"></mat-datepicker-toggle>
						<mat-datepicker #toDate
											disabled="false"></mat-datepicker>
					</mat-form-field>
					
					<magic-bean-button (btnClick)="openLink()"
											label="Confirm"></magic-bean-button>`
})
export class ExportComponent {

	fromDateValue: Date;
	toDateValue: Date;
	constructor(private _bottomSheetRef: MatBottomSheetRef<ExportComponent>) { }

	openLink(event?: MouseEvent): void {
		this._bottomSheetRef.dismiss({ fromDate: this.fromDateValue, toDate: this.toDateValue });
		if (event) {
			event.preventDefault();
		}
	}

	onDateChange(range: 'min' | 'max', date: Date) {
		switch (range) {
			case 'min':
				this.toDateValue = date;
				break;
			case 'max':
				this.fromDateValue = date;
				break;
		}
	}
}
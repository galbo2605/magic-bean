import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IRequest } from '../../../interfaces/request.interface';
import { ITableAction } from '../interfaces/table-action.interface';
import { ApiRequestService } from '../../../services/api-request.service';
import { tap, map, take } from 'rxjs/operators';
import { ITableColumns } from '../interfaces/table-column.interface';
import { ITableData } from '../interfaces/table-data.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
	public isLoadingResults$ = new Subject<boolean>();
	public tableState$ = new Subject<ITableAction>();
	private _dataSource$ = new BehaviorSubject<{ [tableName: string]: ITableData }>(null);
	public dataSource$ = this._dataSource$.asObservable();

	constructor(private apiReqSVC: ApiRequestService) { }

	private tableAction(type: string, payload: any, tableName: string): void {
		this.tableState$.next({ type, payload, tableName })
	}

	readRows(request?: IRequest, tableName?: string): void {
		this.tableAction('readRows', request, tableName);
	}

	insertRow(insertedRow: any, tableName?: string): void {
		const payload = { insertedRow };
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

	getData(request: IRequest, tableName): void {
		this.dataRequest(request, tableName);
	}

	addData({ insertedRow }, tableName: string): void {
		this.refreshData(
			({ [tableName]: { records, count } }) => {
				records.push(insertedRow);
				return { [tableName]: { records, count } };
			}
		);
	}

	updateData({ key, value, updatedRow }, tableName: string): void {
		this.refreshData(
			({ [tableName]: { records, count } }) => {
				const index = records.findIndex(record => record[key] === value);
				records[index] = updatedRow;
				return { [tableName]: { records, count } };
			}
		);
	}

	deleteData({ key, value }, tableName: string): void {
		this.refreshData(
			({ [tableName]: { records, count } }) => {
				const index = records.findIndex(record => record[key] === value);
				records.splice(index, 1);
				return { [tableName]: { records, count } };
			}
		);
	}

	getColumns(request: IRequest): Observable<ITableColumns> {
		return this.sendRequest(request).pipe(
			map(columns => {
				const columnIDs: string[] = columns.map(col => col.id);
				columnIDs.push('star');
				return { columns, columnIDs }
			})
		)
	}

	private sendRequest(request: IRequest): Observable<any> {
		return this.apiReqSVC.request(request);
	}

	private dataRequest(request: IRequest, tableName: string): void {
		this.sendRequest(request).pipe(
			take(1),
		).subscribe(res => {
			this._dataSource$.next({ [tableName]: res });
		});
	}

	private refreshData(mapData: (res: { [tableName: string]: ITableData }) => { [tableName: string]: ITableData }): void {
		this.dataSource$.pipe(
			take(1),
			map(mapData)
		).subscribe(result => this._dataSource$.next(result));
	}
}

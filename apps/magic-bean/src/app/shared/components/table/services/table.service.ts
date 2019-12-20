import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { IRequest } from '../../../interfaces/request.interface';
import { ITableAction } from '../interfaces/table-action.interface';
import { ApiRequestService } from '../../../services/api-request.service';
import { tap, map, take, filter, debounceTime } from 'rxjs/operators';
import { ITableColumns } from '../interfaces/table-column.interface';
import { ITableData } from '../interfaces/table-data.interface';

@Injectable({ providedIn: 'root' })
export class TableService {
	public isLoadingResults$ = new BehaviorSubject<{ [tableName: string]: boolean }>(null);
	private _tableState$ = new Subject<ITableAction>();
	public tableState$ = this._tableState$.asObservable().pipe(
		tap(({ tableName }) => this.isLoadingResults$.next({ [tableName]: true })),
		debounceTime(1000),
	);
	private _dataSource$ = new BehaviorSubject<{ [tableName: string]: ITableData }>(null);
	public dataSource$ = this._dataSource$.asObservable();

	constructor(private apiReqSVC: ApiRequestService) { }

	private tableAction(type: string, payload: any, tableName: string): void {
		this._tableState$.next({ type, payload, tableName })
	}

	readRows(request?: IRequest, tableName?: string): void {
		this.tableAction('readRows', request, tableName);
	}

	updateRow(key: string, value: any, updatedRow: any, tableName?: string): void {
		const payload = { key, value, updatedRow };
		this.tableAction('updateRow', payload, tableName);
	}

	isLoading(tableName: string): Observable<boolean> {
		return this.isLoadingResults$.asObservable().pipe(
			filter(result => result ? !!Object.keys(result).find(table => table === tableName) : true),
			map(result => result[tableName]),
		);
	}

	getDataSource(tableName: string): Observable<ITableData> {
		return this.dataSource$.pipe(
			filter(result => result ? !!Object.keys(result).find(table => table === tableName) : true),
			map(result => {
				this.isLoadingResults$.next({ [tableName]: false });
				return result && result[tableName];
			})
		);
	}

	getData(request: IRequest, tableName): void {
		this.dataRequest(request, tableName);
	}

	updateData({ key, value, updatedRow }, tableName: string): void {
		this.dataSource$.pipe(
			take(1),
			map(({ [tableName]: { records, count } }) => {
				const index = records.findIndex(record => record[key] === value);
				records[index] = updatedRow;
				return { [tableName]: { records, count } };
			})
		).subscribe(result => this._dataSource$.next(result));
	}

	getColumns(request: IRequest): Observable<ITableColumns> {
		return this.sendRequest(request).pipe(
			map(columns => {
				const columnIDs: string[] = columns.map(col => col.id);
				columnIDs.push('actions');
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
			const tableDataSources = this._dataSource$.getValue();
			this._dataSource$.next({ ...tableDataSources, [tableName]: res });
		});
	}
}

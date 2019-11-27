import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, ViewChild, ElementRef, AfterViewInit, TemplateRef, ContentChild, HostBinding, ChangeDetectorRef } from '@angular/core';
import { IColumns } from '../../interfaces/column.interface';
import { Subject, fromEvent } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';
import { MatPaginator, MatTableDataSource, MatSort, Sort, SortDirection, PageEvent } from '@angular/material';
import { TableService } from './services/table.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ITableActionItems } from './interfaces/table-action-items.interfaces';
import { take, debounceTime, tap } from 'rxjs/operators';
import { IRequest } from '../../interfaces/request.interface';
import { ApiRequestService } from '../../services/api-request.service';

@Component({
	selector: 'magic-bean-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
	@Input() tableName: string;
	@Input() columns: IColumns[];
	@Input() colRequest: IRequest;
	@Input() dataSource: any[];
	@Input() dataRequest: IRequest;
	@Input() actionItems: ITableActionItems[]
	@Input() isLoadingResults = false;
	@Input() child: boolean;
	@Output() action = new Subject<IAction>();

	@HostBinding('style.position') position: string;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('filterInput', { static: true }) filterInput: ElementRef;
	@ContentChild('expandableContent', { static: true }) expandableContentTmpl: TemplateRef<any>;

	columnIDs: string[];
	dataSRC: MatTableDataSource<any> = new MatTableDataSource<any>();
	isRateLimitReached = false;

	sortData: { column: string, direction: SortDirection } = { column: 'Created_At', direction: 'desc' };
	filterValue = '';

	expandedElement: any | null;
	shouldExpand: boolean;
	constructor(private cDR: ChangeDetectorRef, private tableService: TableService, private apiReqSVC: ApiRequestService) { }

	ngOnInit() {
		this.dataSRC.sort = this.sort;
		this.dataSRC.paginator = this.paginator;
		this.dataSRC.paginator.pageSizeOptions = [5, 10, 20];
		this.tableService.tableState$.subscribe(({ type, payload, tableName }) => {
			console.log(type, payload, tableName)
			if (tableName === this.tableName) {
				switch (type) {
					case 'readRows': {
						this.isLoadingResults = true;
						const rowsRequest: IRequest = {
							...this.dataRequest,
							path: this.getPath(),
							...payload.request
						};
						this.apiReqSVC.request(rowsRequest).pipe(
							take(1)
						).subscribe(([records, count]) => {
							this.isLoadingResults = false;
							this.dataSource = records;
							this.dataSRC.data = this.dataSource;
							this.dataSRC.paginator.length = count;
							console.log(this.dataSRC.paginator.length);
							console.log(this.paginator.length);
						});
					} break;
					case 'insertRow': {
						const insertdRecord = payload.insertdRow;
						this.dataSRC.data.push(insertdRecord);
						this.dataSRC.data = this.dataSRC.data;
					} break;
					case 'updateRow': {
						const key = payload.key;
						const value = payload.value;
						const updatedRecord = payload.updatedRow;
						const index = this.dataSRC.data.findIndex(record => record[key] === value);
						this.dataSRC.data[index] = updatedRecord;
						this.dataSRC.data = this.dataSRC.data;
					} break;
					case 'deleteRow': {
						const key = payload.key;
						const value = payload.value;
						const index = this.dataSRC.data.findIndex(record => record[key] === value);
						this.dataSRC.data.splice(index, 1);
						this.dataSRC.data = this.dataSRC.data;
					} break;
					default:
						break;
				}
			}
		});

		if (this.actionItems) {
			this.shouldExpand = !!this.actionItems.find(actionItem => actionItem.type === 'expand');
		}
		if (this.colRequest) {
			this.fetchColumns();
		}
		if (this.dataRequest) {
			this.tableService.readRows(null, this.tableName);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		this.position = this.child ? 'unset' : 'relative';
		if (!this.colRequest && this.columns) {
			this.columnIDs = this.columns.map(col => col.id);
			this.columnIDs.push('star');
		}
		if (!this.dataRequest && this.dataSource) {
			this.dataSRC = new MatTableDataSource<any>(this.dataSource);
			this.dataSRC.paginator = this.paginator;
			this.dataSRC.sort = this.sort;
		}
	}

	ngAfterViewInit(): void {
		// filter table
		fromEvent(this.filterInput.nativeElement, 'input').pipe(
			tap(InputEvent => {
				this.isLoadingResults = true;
			}),
			debounceTime(1000),
		).subscribe((inputEvent: any) => {
			this.isLoadingResults = false;
			this.filterValue = (<any>inputEvent.target).value;
			this.tableService.readRows(null, this.tableName);
		});
	}

	sendAction(type: string, payload: any) {
		switch (type) {
			case 'expand':
				this.expandedElement = this.expandedElement === payload ? null : payload
				break;
		}
		this.action.next({ type, payload });
	}

	sortColumn(sort: Sort): void {
		const { active: column, direction: direction } = sort;
		this.sortData = { column, direction };
		this.tableService.readRows(null, this.tableName);
	}

	paginate(page: PageEvent): void {
		// if (page.pageIndex !== this.dataSRC.paginator.pageIndex || page.pageSize !== this.dataSRC.paginator.pageSize) {
		this.tableService.readRows(null, this.tableName);
		// }
	}

	fetchColumns(req?: IRequest): void {
		this.isLoadingResults = true;
		const colRequest: IRequest = {
			...this.colRequest,
			...req
		};
		this.apiReqSVC.request(colRequest).pipe(
			take(1)
		).subscribe(res => {
			this.isLoadingResults = false;
			this.columns = res;
			this.columnIDs = this.columns.map(col => col.id);
			this.columnIDs.push('star');
		});
	}

	getPath(): string {
		return `${this.dataRequest.path}?column=${this.sortData.column}&direction=${this.sortData.direction || 'desc'}&page=${this.dataSRC.paginator.pageIndex}&pageSize=${this.dataSRC.paginator.pageSize}&search=${this.filterValue}`;
	}
}


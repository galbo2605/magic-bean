import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, ViewChild, ElementRef, AfterViewInit, TemplateRef, ContentChild } from '@angular/core';
import { IColumns } from '../../interfaces/column.interface';
import { Subject, fromEvent } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';
import { MatPaginator, MatTableDataSource, MatSort, Sort, SortDirection } from '@angular/material';
import { TableService } from './services/table.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ITableActionItems } from './interfaces/table-action-items.interfaces';
import { take, debounceTime, tap } from 'rxjs/operators';
import { IRequest } from '../../interfaces/request.interface';
import { ApiRequestService } from '../../services/api-request.service';
import { IAmazonClothingItem } from '@magic-bean/api-interfaces';
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
	@Input() columns: IColumns[];
	@Input() colRequest: IRequest;
	@Input() dataSource: any[];
	@Input() dataRequest: IRequest;
	@Input() count: number;
	@Input() actionItems: ITableActionItems[]
	@Input() isLoadingResults = false;
	@Input() child: boolean;
	@Output() action = new Subject<IAction>();

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('filterInput', { static: true }) filterInput: ElementRef;
	@ContentChild('expandableContent', { static: true }) expandableContentTmpl: TemplateRef<any>;

	columnIDs: string[];
	dataSRC: MatTableDataSource<any>;
	resultsLength = 0;
	isRateLimitReached = false;

	sortData: { column: string, direction: SortDirection } = { column: 'Created_At', direction: 'desc' };
	filterValue = '';

	expandedElement: any | null;
	shouldExpand: boolean;
	constructor(private tableService: TableService, private apiReqSVC: ApiRequestService) { }

	ngOnInit() {
		if (this.actionItems) {
			this.shouldExpand = !!this.actionItems.find(actionItem => actionItem.type === 'expand');
		}
		if (this.colRequest) {
			this.fetchColumns();
		}
		if (this.dataRequest) {
			this.fetchData();
		}
		this.tableService.tableState$.subscribe(({ type, payload }) => {
			switch (type) {
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
					this.dataSRC.data = this.dataSRC.data.filter(record => record[key] !== value);
				} break;
				default:
					break;
			}
		})
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		if (!this.colRequest && this.columns) {
			this.columnIDs = this.columns.map(col => col.id);
			this.columnIDs.push('star');
		}
		if (this.count) {
			this.resultsLength = +this.count;
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
			tap(v => this.isLoadingResults = true),
			debounceTime(1000),
		).subscribe((inputEvent: any) => {
			this.filterValue = (<any>inputEvent.target).value;
			this.fetchData();
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
		this.fetchData();
	}

	fetchData(req?: IRequest): void {
		this.isLoadingResults = true;
		const dataRequest: IRequest = {
			...this.dataRequest,
			path: this.getPath(),
			...req
		};
		this.apiReqSVC.request(dataRequest).pipe(
			take(1)
		).subscribe(res => {
			this.isLoadingResults = false;
			this.dataSource = res;
			this.dataSRC = new MatTableDataSource<any>(this.dataSource);
			this.dataSRC.paginator = this.paginator;
			this.dataSRC.sort = this.sort;
		});
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
		return `${this.dataRequest.path}?column=${this.sortData.column}&direction=${this.sortData.direction || 'desc'}&page=${0}&search=${this.filterValue}`;
	}
}


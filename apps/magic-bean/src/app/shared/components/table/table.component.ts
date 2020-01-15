import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, ViewChild, ElementRef, AfterViewInit, TemplateRef, ContentChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ITableColumns } from './interfaces/table-column.interface';
import { Subject, fromEvent, Observable } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';
import { Sort, SortDirection, PageEvent, MatTable } from '@angular/material';
import { TableService } from './services/table.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ITableActionItems } from './interfaces/table-action-items.interfaces';
import { IRequest } from '../../interfaces/request.interface';
import { ITableData } from './interfaces/table-data.interface';
import { takeWhile, filter } from 'rxjs/operators';

@Component({
	selector: 'magic-bean-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('325ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
	@Input() tableName: string;
	@Input() colRequest: IRequest;
	@Input() dataRequest: IRequest;
	@Input() actionItems: ITableActionItems[]
	@Input() child: boolean;
	@Output() action = new Subject<IAction>();

	@ViewChild(MatTable, { static: false }) matTable: MatTable<any>;
	@ViewChild('filterInput', { static: true }) filterInput: ElementRef;
	@ContentChild('expandableContent', { static: true }) expandableContentTmpl: TemplateRef<any>;

	columns$: Observable<ITableColumns>;
	dataSource$: Observable<ITableData>;
	isLoadingResults$: Observable<boolean>;

	filterValue = '';
	sortData: { column: string, direction: SortDirection } = { column: 'Created_At', direction: 'desc' };
	page: PageEvent = {
		length: 0,
		pageIndex: 0,
		pageSize: 10,
	};

	expandedElement: any | null;
	shouldExpand: boolean;

	componentActive = true;
	constructor(private tableService: TableService, private cDR: ChangeDetectorRef) { }

	ngOnInit() {
		this.isLoadingResults$ = this.tableService.isLoading(this.tableName);
		this.dataSource$ = this.tableService.getDataSource(this.tableName);
		this.tableService.tableState$.pipe(
			takeWhile(() => this.componentActive),
			filter(({ tableName }) => tableName === this.tableName),
		).subscribe(({ type, payload, tableName }) => {
			console.log(type, payload, tableName)
			switch (type) {
				case 'readRows': {
					const rowsRequest: IRequest = {
						...this.dataRequest,
						path: this.getPath(),
						...payload as IRequest
					};
					this.tableService.getData(rowsRequest, tableName);
				} break;
				case 'updateRow': {
					this.tableService.updateData(payload, tableName);
				} break;
			}
			if (this.matTable) {
				this.matTable.renderRows();
			}
		});
		this.initTable();
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}

	ngAfterViewInit(): void {
		this.filterTable();
	}

	ngOnDestroy(): void {
		this.tableService.dataSource$.pipe(
			takeWhile(() => this.componentActive)
		).subscribe(ds => delete ds[this.tableName]);
		this.componentActive = false;
	}

	initTable(): void {
		if (this.actionItems) {
			this.shouldExpand = !!this.actionItems.find(actionItem => actionItem.type === 'expand');
		}
		if (this.colRequest) {
			this.columns$ = this.tableService.getColumns(this.colRequest);
		}
		if (this.dataRequest) {
			this.tableService.readRows(null, this.tableName);
		}
	}

	sendAction(type: string, payload: any) {
		switch (type) {
			case 'expand':
				this.expandedElement = this.expandedElement === payload ? null : payload
				break;
		}
		this.action.next({ type, payload });
	}

	filterTable(): void {
		fromEvent(this.filterInput.nativeElement, 'input').pipe(
			takeWhile(() => this.componentActive),

		).subscribe((inputEvent: any) => {
			this.filterValue = (<any>inputEvent.target).value;
			this.tableService.readRows(null, this.tableName);
		});
	}

	sortColumn(sort: Sort): void {
		const { active: column, direction: direction } = sort;
		this.sortData = { column, direction };
		this.tableService.readRows(null, this.tableName);
	}

	paginate(page: PageEvent): void {
		this.page = { ...page };
		this.tableService.readRows(null, this.tableName);
	}

	getPath(): string {
		return `${this.dataRequest.path}?column=${this.sortData.column}&direction=${this.sortData.direction || 'desc'}&page=${this.page.pageIndex}&pageSize=${this.page.pageSize || 5}&search=${this.filterValue}`;
	}
}


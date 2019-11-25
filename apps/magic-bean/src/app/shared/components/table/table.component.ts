import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, Output, ViewChild } from '@angular/core';
import { IColumns } from '../../interfaces/column.interface';
import { Subject } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
	selector: 'magic-bean-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
	@Input() columns: IColumns[];
	@Input() dataSource: any[];
	@Output() action = new Subject<IAction>();

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	
	dataSRC: MatTableDataSource<any>;
	columnIDs: string[];
	constructor() { }

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		if (this.columns) {
			this.columnIDs = this.columns.map(col => col.id);
			this.columnIDs.push('star');
		}
		if (this.dataSource) {
			this.dataSRC = new MatTableDataSource<any>(this.dataSource);
			this.dataSRC.paginator = this.paginator;
			this.dataSRC.sort = this.sort;
		}
	}

	sendAction(type: string, payload: any) {
		this.action.next({ type, payload });
	}
}


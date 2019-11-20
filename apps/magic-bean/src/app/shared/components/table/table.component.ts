import { Component, OnInit, Input } from '@angular/core';
import { IColumns } from '../../interfaces/column.interface';

@Component({
	selector: 'magic-bean-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
	@Input() columns: IColumns[];
	@Input() dataSource: any[];

	columnIDs: string[]= [];
	constructor() { }

	ngOnInit() {
		this.columnIDs = this.columns.map(col => col.id);
	}

}


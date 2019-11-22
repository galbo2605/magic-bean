import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { IColumns } from '../../interfaces/column.interface';

@Component({
	selector: 'magic-bean-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
	@Input() columns: IColumns[];
	@Input() dataSource: any[];

	columnIDs: string[];
	constructor() { }

	ngOnInit() {
	}
	
	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		if (this.columns) {
			this.columnIDs = this.columns.map(col => col.id);
		}
	}

}


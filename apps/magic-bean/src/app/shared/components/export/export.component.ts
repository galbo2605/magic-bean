import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
	selector: 'magic-bean-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss'],
})
export class ExportComponent {

	fromDateValue: Date;
	toDateValue: Date;
	constructor(private _bottomSheetRef: MatBottomSheetRef<ExportComponent>) { }

	openLink(): void {
		this._bottomSheetRef.dismiss({ fromDate: this.fromDateValue, toDate: this.toDateValue });
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
import { Component, OnInit, Inject, ChangeDetectionStrategy,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { IField } from '../shared/components/form-field/interfaces/field.interface';
import { clothingFields } from './clothingFields';
@Component({
	selector: 'magic-bean-test-form',
	templateUrl: './test-form.component.html',
	styleUrls: ['./test-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestFormComponent implements OnInit {
	formGroup: FormGroup = new FormGroup({});

	fields: IField[] = clothingFields;
	constructor(
		public dialogRef: MatDialogRef<TestFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit(): void {
	}

	onSave(): void {
		console.log(this.formGroup);
		this.data = { ...this.data, ...this.formGroup.getRawValue() };
		this.dialogRef.close({ type: 'save', payload: this.data })
	}

	onClose(): void {
		console.log(this.formGroup);
		this.dialogRef.close({ type: 'close', payload: 'close' });
	}
}



import { Component, OnInit, Inject, ChangeDetectionStrategy, Input,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { clothingFields } from './clothingFields';
import { IField } from '../shared/components/form-management/interfaces/field.interface';
@Component({
	selector: 'magic-bean-test-form',
	templateUrl: './test-form.component.html',
	styleUrls: ['./test-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestFormComponent implements OnInit {
	formGroup: FormGroup = new FormGroup({});

	@Input() fields: IField[] = clothingFields;
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



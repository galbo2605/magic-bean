import { Component, Inject, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { clothingForm } from './clothingForm';
import { IForm } from '../shared/components/form-management/interfaces/form.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
	selector: 'magic-bean-test-form',
	templateUrl: './test-form.component.html',
	styleUrls: ['./test-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestFormComponent {
	formGroup: FormGroup = new FormGroup({});

	@Input() form: IForm = clothingForm;
	constructor(
		public dialogRef: MatDialogRef<TestFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onSave(): void {
		this.data = { ...this.data, ...this.formGroup.getRawValue() };
		this.dialogRef.close({ type: 'save', payload: this.data })
	}

	onClose(): void {
		this.dialogRef.close({ type: 'close', payload: 'close' });
	}

	setFormGroup(fG: FormGroup): void {
		this.formGroup = fG;
		this.formGroup.reset();
		this.formGroup.patchValue(this.data);
	}
}

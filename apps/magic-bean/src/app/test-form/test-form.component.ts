import { Component, Inject, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { clothingFields } from './clothingFields';
import { IForm } from '../shared/components/form-management/interfaces/form.interface';
@Component({
	selector: 'magic-bean-test-form',
	templateUrl: './test-form.component.html',
	styleUrls: ['./test-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestFormComponent {
	formGroup: FormGroup = new FormGroup({});

	@Input() fields: IForm[] = clothingFields;
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

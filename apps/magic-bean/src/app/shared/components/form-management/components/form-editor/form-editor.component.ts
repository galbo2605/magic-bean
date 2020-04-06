import { Component, Input, ChangeDetectionStrategy, Output, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { IForm } from '../../interfaces/form.interface';
import { IField } from '../../interfaces/field.interface';
import { IAction } from '../../../../interfaces/action.interface';
import { IFieldValue } from '../../interfaces/field-value.interface';

@Component({
	selector: 'magic-bean-form-editor',
	templateUrl: './form-editor.component.html',
	styleUrls: ['./form-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEditorComponent implements AfterViewInit {
	@Input() form: IForm;
	_createdFormGroup: FormGroup = new FormGroup({});

	@Output() fieldProperties = new Subject<IField>();
	@Output() fieldValue = new Subject<IFieldValue>();
	@Output() createdFormGroup = new Subject<IAction>();

	_selectedFieldIndex: number;

	ngAfterViewInit(): void {
		this.createdFormGroup.next({ type: 'view init', payload: this._createdFormGroup });
	}

	onSave(): void {
		this.createdFormGroup.next({ type: 'button click', payload: this._createdFormGroup });
	}

	onFieldClick(fieldIndex: number): void {
		if (this._selectedFieldIndex !== fieldIndex) {
			const fieldProperties = this.form.fields[fieldIndex];
			this.fieldProperties.next(fieldProperties);
			this._selectedFieldIndex = fieldIndex;
		}
	}

	onDeleteField(fieldIndex: number): void {
		this.form.fields.splice(fieldIndex, 1);
	}

	isButtonDisabled(): boolean {
		if (this.form.hasOwnProperty('buttonDisabled')) {
			return this.form.buttonDisabled;
		}
		return this._createdFormGroup.invalid || this._createdFormGroup.untouched || this._createdFormGroup.pristine;
	}

	fieldValueChange(fieldName: string, value: any): void {
		this.fieldValue.next({ fieldName, value });
	}

}

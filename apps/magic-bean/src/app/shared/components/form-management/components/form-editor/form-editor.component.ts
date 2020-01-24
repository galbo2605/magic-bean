import { Component, Input, ChangeDetectionStrategy, Output, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { IForm } from '../../interfaces/form.interface';
import { IField } from '../../interfaces/field.interface';

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
	@Output() createdFormGroup = new Subject<FormGroup>();

	ngAfterViewInit(): void {
		this.createdFormGroup.next(this._createdFormGroup);
	}

	onSave(): void {
		this.createdFormGroup.next(this._createdFormGroup);
	}

	onFieldClick(fieldIndex: number): void {
		const fieldProperties = this.form.fields[fieldIndex];
		this.fieldProperties.next(fieldProperties);
	}

	onDeleteField(fieldIndex: number): void {
		this.form.fields.splice(fieldIndex, 1);
	}

}

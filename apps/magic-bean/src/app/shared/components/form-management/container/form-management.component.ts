import { Component, ChangeDetectionStrategy, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { clothingForm } from '../../../../test-form/clothingForm';
import { IForm } from '../interfaces/form.interface';
import { EFieldType } from '../enums/field-type.enum';
import { editorForm } from './editor-form'
import { IField } from '../interfaces/field.interface';

@Component({
	selector: 'magic-bean-form-management',
	templateUrl: './form-management.component.html',
	styleUrls: ['./form-management.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormManagementComponent implements OnInit {
	editorForm: IForm = editorForm;
	editorFormGroup: FormGroup;
	_editorMode: boolean;

	@Input() form: IForm = clothingForm;
	@Output() formGroup = new Subject<FormGroup>();

	constructor(private router: Router) { }

	ngOnInit(): void {
		this._editorMode = this.router.url.replace('/', '') === 'form-management';
		this.editorForm.editing = this.form.editing = this.form.removableFields = this._editorMode;
	}

	getCreatedFormGroup(cFG: FormGroup): void {
		this.formGroup.next(cFG);
	}

	getEditorFormGroup(eFG: FormGroup): void {
		if (!this.editorFormGroup) {
			this.editorFormGroup = eFG;
		} else {
			// get field properties
			const fieldProperties: IField = this.editorFormGroup.value;

			// custom post-creation validation
			switch (fieldProperties.type) {
				case EFieldType.DROPDOWN:
					// handle comma seperated values from text field to set options array
					fieldProperties.options = fieldProperties.options.toString().split(',');
					break;
				default:
					break;
			}

			// look for a field to update (via UI's controlName field)
			const foundFieldIndex = this.form.fields.findIndex(field => field.controlName === fieldProperties.controlName);

			// if no order is set
			if (!fieldProperties.orderPosition) {
				// set to end of created fields array
				fieldProperties.orderPosition = this.form.fields.length + 1;
			}

			// if found field
			if (foundFieldIndex >= 0) {
				// updated it
				this.form.fields[foundFieldIndex] = fieldProperties;
			} else {
				// create new
				this.form.fields.push(fieldProperties);
			}

			// sort created fields
			this.form.fields.sort((a, b) => a.orderPosition - b.orderPosition);
			console.log(this.form.fields);
		}
	}

	editField(form: IForm): void {
		this.editorFormGroup.reset();
		this.editorFormGroup.patchValue(form);
	}
}

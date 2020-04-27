import { Component, ChangeDetectionStrategy, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { clothingForm } from '../../../../test-form/clothingForm';
import { IForm } from '../interfaces/form.interface';
import { EFieldType } from '../enums/field-type.enum';
import fieldForm from './field-form'
import { IField } from '../interfaces/field.interface';
import formSelection from './form-selection';
import newForm from './new-form';
import { FormManagementAPIService } from '../services/form-management-api.service';
import { take } from 'rxjs/operators';
import { IAction } from '../../../interfaces/action.interface';
import { IFieldValue } from '../interfaces/field-value.interface';
import { IFieldDropdown } from '../interfaces/field-optionals.interface';

@Component({
	selector: 'magic-bean-form-management',
	templateUrl: './form-management.component.html',
	styleUrls: ['./form-management.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormManagementComponent implements OnInit, OnDestroy {
	formSelection: IForm = formSelection;
	fieldForm: IForm = fieldForm;
	editorFormGroup: FormGroup;

	@Input() form: IForm;
	@Output() formGroup = new Subject<FormGroup>();
	forms$;
	constructor(private router: Router, private formManagementAPISVC: FormManagementAPIService) { }

	ngOnInit(): void {
		this.fieldForm.editing = this.router.url.replace('/', '') === 'form-management';
		if (this.fieldForm.editing) {
			this.initFormSelection();
		}
	}

	ngOnDestroy(): void {
		if (this.form) {
			this.form.editing = this.form.removableFields = this.form.highlightField = false;
		}
	}

	initFormSelection(cFG?: FormGroup): void {
		this.forms$ = this.formManagementAPISVC.getForms();
		if (this.editorFormGroup) {
			this.editorFormGroup.reset();
		}
		switch (cFG && cFG.value.formList) {
			case 'Amazon Clothing':
				this.form = clothingForm;
				break;
			case 'New Form':
				this.form = newForm;
				break;
		}
		if (this.form) {
			this.form.editing = this.form.removableFields = this.form.highlightField = this.fieldForm.editing;
		}
	}

	getCreatedFormGroup(action: IAction): void {
		const { type, payload } = action;
		const cFG = payload as FormGroup;
		this.formGroup.next(cFG);
		switch (type) {
			case 'view init':
				break;
			case 'button click':
				if (this.form.editing && this.form.buttonLabel === 'Save Form') {
					console.log(this.form);

					this.formManagementAPISVC.saveForm(this.form).pipe(take(1)).subscribe();
				}
				break;
		}
	}

	getFieldFormGroup(eFG: FormGroup): void {
		if (!this.editorFormGroup) {
			this.editorFormGroup = eFG;
		} else {
			// get field properties
			const fieldProperties: IField = this.editorFormGroup.value;

			// custom post-creation validation
			switch (fieldProperties.type) {
				case EFieldType.DROPDOWN:
					// handle comma seperated values from text field to set options array
					fieldProperties.options = fieldProperties.options.toString().split(',').map(option => {
						return { label: option, value: option };
					});
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
			this.form = { ...this.form };
		}
	}

	editField(form: IForm): void {
		this.editorFormGroup.reset();
		this.editorFormGroup.patchValue(form);
	}

	onFormSelectionChanges(fieldValue: IFieldValue): void {
		switch (fieldValue.fieldName) {
			case 'formList':
				if (fieldValue.value === 'New Form') {
					const formName: IField = {
						controlName: 'formName',
						placeholder: 'Form Name',
						type: EFieldType.TEXT,
						value: 'New Form',
						hintLabel: 'The name of your new form!'
					};
					this.formSelection.fields.push(formName);
					this.formSelection.buttonLabel = 'Create Form';
				} else {
					this.formSelection.fields.splice(1, 1);
					newForm.name = 'New Form';
					this.formSelection.buttonLabel = 'Load Form';
				}
				break;
			case 'formName':
				newForm.name = fieldValue.value;
				this.form = { ...this.form, name: fieldValue.value };
				break;
		}
	}
}

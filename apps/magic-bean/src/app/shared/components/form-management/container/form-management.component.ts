import { FormGroup } from '@angular/forms';
import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { clothingFields } from '../../../../test-form/clothingFields';
import { IForm } from '../interfaces/form.interface';
import { EFieldType } from '../enums/field-type.enum';
import { editorFields } from './editor-form'
import { Subject } from 'rxjs';

@Component({
	selector: 'magic-bean-form-management',
	templateUrl: './form-management.component.html',
	styleUrls: ['./form-management.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormManagementComponent {
	editorFields: IForm[] = editorFields;
	editorFormGroup: FormGroup;
	@Input() editorMode = true;

	@Input() formFields: IForm[] = clothingFields;
	@Input() fieldsData: any;
	@Output() formGroup = new Subject<FormGroup>();

	getCreatedFormGroup(cFG: FormGroup): void {
		this.formGroup.next(cFG);
	}

	getEditorFormGroup(eFG: FormGroup): void {
		if (!this.editorFormGroup) {
			this.editorFormGroup = eFG;
		} else {
			// get field properties
			const fieldProperties: IForm = this.editorFormGroup.value;

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
			const foundFieldIndex = this.formFields.findIndex(field => field.controlName === fieldProperties.controlName);

			// if no order is set
			if (!fieldProperties.orderPosition) {
				// set to end of created fields array
				fieldProperties.orderPosition = this.formFields.length + 1;
			}

			// if found field
			if (foundFieldIndex >= 0) {
				// updated it
				this.formFields[foundFieldIndex] = fieldProperties;
			} else {
				// create new
				this.formFields.push(fieldProperties);
			}

			// sort created fields
			this.formFields.sort((a, b) => a.orderPosition - b.orderPosition);
			console.log(this.formFields);
		}
	}

	editField(form: IForm): void {
		this.editorFormGroup.reset();
		this.editorFormGroup.patchValue(form);
	}
}

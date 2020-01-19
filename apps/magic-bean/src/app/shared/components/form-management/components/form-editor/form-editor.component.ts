import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from '../../interfaces/field.interface';
import { EFieldType } from '../../enums/field-type.enum';
import { clothingFields } from '../../../../../test-form/clothingFields';

@Component({
	selector: 'magic-bean-form-editor',
	templateUrl: './form-editor.component.html',
	styleUrls: ['./form-editor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEditorComponent implements OnInit {
	@Input() fields: IField[];
	formGroup: FormGroup = new FormGroup({});
	@Input() createdFields: IField[] = clothingFields;
	createdFormGroup: FormGroup = new FormGroup({});

	ngOnInit(): void {
		const mandatories: IField[] = [
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'formName', placeholder: 'Form Name', required: true },
			{ formName: 'formEditor', type: EFieldType.DROPDOWN, controlName: 'type', placeholder: 'Type', options: [EFieldType.TEXT, EFieldType.NUMBER, EFieldType.EMAIL, EFieldType.DROPDOWN], required: true },
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'controlName', placeholder: 'Field Name', required: true },
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'placeholder', placeholder: 'Placeholder', required: true }
		];
		const validators: IField[] = [
			{ formName: 'formEditor', type: EFieldType.CHECKBOX, controlName: 'required', placeholder: 'Required', hintMessage: 'check if this is mandatory' },
			{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'min', placeholder: 'Minimum Value' },
			{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'max', placeholder: 'Maximum Value' },
			{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'step', placeholder: 'Decimal Steps', hintLabel: 'number of steps in each increase/decrease of the field' }
		];
		const optionals: IField[] = [
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'hintLabel', placeholder: 'Hint Label' },
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'hintMessage', placeholder: 'Hint Message' },
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'value', placeholder: 'Initial Default Value' },
			{ formName: 'formEditor', type: EFieldType.CHECKBOX, controlName: 'disabled', placeholder: 'Disabled', hintMessage: 'check to disabled/enabled by default' },
			{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'options', placeholder: 'Dropdown Options', hintLabel: 'comma seperated values' }
		];
		const misc: IField[] = [
			{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'orderPosition', placeholder: 'Order Position', hintLabel: 'position of the field in the form' }
		];

		const editorFields = [].concat(mandatories, validators, optionals, misc);
		this.fields = editorFields;
	}

	onSaveField(): void {
		// get field properties
		const fieldProperties: IField = this.formGroup.value;

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
		const foundFieldIndex = this.createdFields.findIndex(field => field.controlName === fieldProperties.controlName);

		// if no order is set
		if (!fieldProperties.orderPosition) {
			// set to end of created fields array
			fieldProperties.orderPosition = this.createdFields.length + 1;
		}

		// if found field
		if (foundFieldIndex >= 0) {
			// updated it
			this.createdFields[foundFieldIndex] = fieldProperties;
		} else {
			// create new
			this.createdFields.push(fieldProperties);
		}

		// sort created fields
		this.createdFields.sort((a, b) => a.orderPosition - b.orderPosition);
	}

	onFieldClick(createdFieldIndex: number): void {
		this.formGroup.reset();
		const fieldProperties = this.createdFields[createdFieldIndex];
		this.formGroup.patchValue(fieldProperties);
	}

	onCreatedFormSave(): void {
	}

	onDeleteField(createdField: IField): void {
		this.createdFields = this.createdFields.filter(field => field.controlName !== createdField.controlName);
	}

}

import { Component, OnInit, Input } from '@angular/core';
import { IField } from '../../form-field/interfaces/field.interface';
import { EFieldType } from '../../form-field/enums/field.-type.enum';
import { FormGroup } from '@angular/forms';
import { clothingFields } from '../../../../test-form/clothingFields';

@Component({
	selector: 'magic-bean-form-editor',
	templateUrl: './form-editor.component.html',
	styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
	@Input() fields: IField[];
	formGroup: FormGroup = new FormGroup({});
	@Input() createdFields: IField[] = clothingFields;
	createdFormGroup: FormGroup = new FormGroup({});

	ngOnInit(): void {
		const mandatories: IField[] = [
			{ type: EFieldType.DROPDOWN, controlName: 'type', placeholder: 'Type', options: [EFieldType.TEXT, EFieldType.NUMBER, EFieldType.EMAIL, EFieldType.DROPDOWN], required: true },
			{ type: EFieldType.TEXT, controlName: 'controlName', placeholder: 'Field Name', required: true },
			{ type: EFieldType.TEXT, controlName: 'placeholder', placeholder: 'Placeholder', required: true }
		];
		const validators: IField[] = [
			{ type: EFieldType.DROPDOWN, controlName: 'required', placeholder: 'Required', options: [true, false], value: null },
			{ type: EFieldType.NUMBER, controlName: 'min', placeholder: 'Minimum Value', value: null },
			{ type: EFieldType.NUMBER, controlName: 'max', placeholder: 'Maximum Value', value: null },
			{ type: EFieldType.NUMBER, controlName: 'step', placeholder: 'Decimal Steps', value: null, hintMessage: 'number of steps in each increase/decrease of the field' }
		];
		const optionals: IField[] = [
			{ type: EFieldType.TEXT, controlName: 'hintLabel', placeholder: 'Hint Label', value: null },
			{ type: EFieldType.TEXT, controlName: 'hintMessage', placeholder: 'Hint Message', value: null },
			{ type: EFieldType.TEXT, controlName: 'value', placeholder: 'Initial Default Value', value: null },
			{ type: EFieldType.DROPDOWN, controlName: 'disabled', placeholder: 'Disabled', value: null, options: [true, false], hintMessage: 'disabled/enabled by default' },
			{ type: EFieldType.TEXT, controlName: 'options', placeholder: 'Dropdown Options', value: null, hintMessage: 'comma seperated values' }
		];
		const editorFields = [].concat(mandatories, validators, optionals);
		this.fields = editorFields;
	}

	onSaveField(): void {
		const fieldProperties = this.formGroup.value;
		const foundFieldIndex = this.createdFields.findIndex(field => field.controlName === fieldProperties.controlName);
		switch (fieldProperties.type) {
			case EFieldType.DROPDOWN:
				fieldProperties.options = (<string>fieldProperties.options).split(',');
				break;
			default:
				break;
		}
		if (foundFieldIndex >= 0) {
			this.createdFields[foundFieldIndex] = fieldProperties;
		} else {
			this.createdFields.push(fieldProperties);
		}
	}

	onFieldClick(controlName: string): void {
		const fieldProperties = this.createdFields.find(field => field.controlName === controlName);
		this.formGroup.patchValue(fieldProperties);
	}

	onCreatedFormSave(): void {
		console.log(this.createdFormGroup);
	}

}

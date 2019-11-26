import { Component, Input, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, ControlContainer, FormGroupDirective, AbstractControl, FormControl } from '@angular/forms';
import { TFieldType } from './types/field-type.type';
import { EFieldType } from './enums/field.-type.enum';

@Component({
	selector: 'magic-bean-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.css'],
	viewProviders: [
		/** gets the form group from the parent component - registering the `formControlName`s */
		{ provide: ControlContainer, useExisting: FormGroupDirective },
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnChanges {
	@Input() form: FormGroup;
	@Input() type: TFieldType;
	@Input() controlName: string;
	@Input() placeholder: string;
	@Input() required?: boolean;
	@Input() min?: number;
	@Input() max?: number;
	@Input() hintLabel?: string;
	@Input() value?: any;
	@Input() disabled?: boolean;
	@Input() options: any[];
	readonly fieldType = EFieldType;
	control: AbstractControl;

	constructor(private cDR: ChangeDetectorRef) { }

	ngOnChanges(): void {
		this.form.addControl(this.controlName, new FormControl())
		this.control = this.form.controls[this.controlName];
		this.setValidation();
		this.control.patchValue(this.value);
		if (this.disabled) {
			this.control.disable();
		}
	}

	private setValidation(): void {
		const validators = [];
		switch (this.type) {
			case this.fieldType.TEXT:
			case this.fieldType.EMAIL:
				if (this.min) {
					validators.push(Validators.minLength(this.min));
				}
				if (this.max) {
					validators.push(Validators.maxLength(this.max));
				}
				break;
			case this.fieldType.NUMBER:
				if (this.min) {
					validators.push(Validators.min(this.min));
				}
				if (this.max) {
					validators.push(Validators.max(this.max));
				}
				break;
		}
		if (this.required) {
			validators.push(Validators.required);
		}
		this.control.setValidators(validators);
	}

	getErrorMessage(): string {
		const ctrlErrors = this.control.errors;
		console.log(this.controlName, ctrlErrors);
		const error = Object.keys(ctrlErrors)[0];
		let errorMessage: string;
		switch (error) {
			case 'min':
				errorMessage = `Min value required is ${ctrlErrors[error][error]} `;
				break;
			case 'max':
				errorMessage = `Max value required is ${ctrlErrors[error][error]}`;
				break;
			case 'minlength':
				errorMessage = `Min length required is ${ctrlErrors[error].requiredLength}`;
				break;
			case 'maxlength':
				errorMessage = `Max length required is ${ctrlErrors[error].requiredLength}`;
				break;
			case 'required':
				errorMessage = 'This field is required';
				break;
			case 'email':
				errorMessage = 'Not a valid email';
				break;
			default:
				errorMessage = '';
				break;
		}
		return errorMessage;
	}

	getHint(): string {
		let hintMessage: string;
		const controlValue = this.control.value || '';
		switch (this.type) {
			case this.fieldType.NUMBER:
				hintMessage = `${controlValue || this.min}${this.max ? `-${this.max}` : ''}`;
				break;
			case this.fieldType.TEXT:
			case this.fieldType.EMAIL:
				hintMessage = `${controlValue.length || this.min}${this.max ? `/${this.max}` : ''}`;
				break;
			case this.fieldType.DROPDOWN:
				hintMessage = `Here's the dropdown arrow ^`;
				break;
			default:
				hintMessage = '';
				break;
		}
		return hintMessage;
	}
}

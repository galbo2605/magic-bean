import { Component, Input, ChangeDetectionStrategy, OnChanges, AfterViewInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, Validators, ControlContainer, FormGroupDirective, AbstractControl, FormControl } from '@angular/forms';
import { TFieldType } from '../../types/field-type.type';
import { EFieldType } from '../../enums/field-type.enum';
import { takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IRequest } from '../../../../interfaces/request.interface';

@Component({
	selector: 'magic-bean-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [
		/** gets the form group from the parent component - registering the `formControlName`s */
		{ provide: ControlContainer, useExisting: FormGroupDirective },
	]
})
export class FormFieldComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() form: FormGroup;
	@Input() type: TFieldType;
	@Input() controlName: string;
	@Input() placeholder: string;
	@Input() required?: boolean;
	@Input() min?: number;
	@Input() max?: number;
	@Input() step?: number;
	@Input() hintLabel?: string;
	@Input() hintMessage?: string;
	@Input() value?: any;
	@Input() disabled?: boolean;
	@Input() options?: any[];
	@Input() iconPrefix?: string;
	@Input() iconSuffix?: string;
	@Input() request?: IRequest;
	@Output() valueChanges = new Subject<any>();
	readonly fieldType = EFieldType;
	control: AbstractControl;
	errorMessage: string;

	isMatFormField: boolean;

	private componentActive = true;

	ngOnChanges(): void {
		this.form.addControl(this.controlName, new FormControl())
		this.control = this.form.controls[this.controlName];
		this.setValidation();
		this.control.patchValue(this.value);
		if (this.value && this.control.invalid) {
			this.control.markAsTouched();
		}
		if (this.disabled) {
			this.control.disable();
		}
		this.isMatFormField = !!this.type.match(`${this.fieldType.TEXT}|${this.fieldType.NUMBER}|${this.fieldType.EMAIL}|${this.fieldType.DROPDOWN}`);
	}

	ngAfterViewInit(): void {
		this.control.valueChanges.pipe(
			takeWhile(() => this.componentActive)
		).subscribe(value => {
			this.valueChanges.next(value);
		});
	}

	ngOnDestroy(): void {
		this.componentActive = false;
	}

	private setValidation(): void {
		const validators = [];
		switch (this.type) {
			case this.fieldType.TEXT:
			case this.fieldType.EMAIL:
				if (typeof this.min === 'number') {
					validators.push(Validators.minLength(this.min));
				}
				if (typeof this.max === 'number') {
					validators.push(Validators.maxLength(this.max));
				}
				break;
			case this.fieldType.NUMBER:
				if (typeof this.min === 'number') {
					validators.push(Validators.min(this.min));
				}
				if (typeof this.max === 'number') {
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
		const error = ctrlErrors && Object.keys(ctrlErrors)[0],
			errorObj = ctrlErrors && ctrlErrors[error];
		switch (error) {
			case 'min':
				this.errorMessage = `Min value required is ${errorObj[error]}, you're ${Math.abs(errorObj.actual - errorObj.min)} under`;
				break;
			case 'max':
				this.errorMessage = `Max value required is ${errorObj[error]}, you're ${errorObj.actual - errorObj.max} over`;
				break;
			case 'minlength':
				this.errorMessage = `Min length required is ${errorObj.requiredLength}, you're ${errorObj.requiredLength - errorObj.actualLength} letters short`;
				break;
			case 'maxlength':
				this.errorMessage = `Max length required is ${errorObj.requiredLength}, you're ${errorObj.actualLength - errorObj.requiredLength} letters over`;
				break;
			case 'required':
				this.errorMessage = 'This field is required';
				break;
			case 'email':
				this.errorMessage = 'Not a valid email';
				break;
			default:
				this.errorMessage = '';
				break;
		}
		return this.errorMessage;
	}

	getHint(): string {
		const controlValue = this.control.value || '';
		switch (this.type) {
			case this.fieldType.NUMBER:
				this.hintMessage = `${controlValue || this.min}${this.max ? `-${this.max}` : ''}`;
				break;
			case this.fieldType.TEXT:
			case this.fieldType.EMAIL:
				this.hintMessage = `${controlValue.length || this.min}${this.max ? `/${this.max}` : ''}`;
				break;
		}
		if (this.hintMessage === 'undefined') {
			this.hintMessage = '';
		}
		return this.hintMessage;
	}

	response(value: any): void {
		console.log('form-field component - response method', value);
		console.table(value.records);
	}
}

import { TFieldType } from '../types/field-type.type';
import { IFieldOptionals } from './field-optionals.interface';
import { IFieldValidators } from './field-validators.interface';
import { IFieldMisc } from './field-misc.interface';

export interface IField extends IFieldValidators, IFieldOptionals, IFieldMisc {
	formName: string;
	type: TFieldType;
	controlName: string;
	placeholder: string;
}

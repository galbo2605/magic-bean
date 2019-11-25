import { TFieldType } from '../types/field-type.type';
import { IFieldOptionals } from './field-optionals.interface';
import { IFieldValidators } from './field-validators.interface';
export interface IField extends IFieldValidators, IFieldOptionals {
	type: TFieldType;
	controlName: string;
	placeholder: string;
}

import { IField } from './field.interface';
export interface IForm extends IFormOptions {
	formName: string;
	fields: IField[];
}

export interface IFormOptions {
	editing?: boolean;
	removableFields?: boolean;
	mode?: 'Read' | 'Write';
}

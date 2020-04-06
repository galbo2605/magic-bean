import { IField } from './field.interface';
export interface IForm extends IFormOptions {
	name: string;
	fields: IField[];
}

export interface IFormOptions {
	editing?: boolean;
	removableFields?: boolean;
	mode?: 'Read' | 'Write';
	subtitle?: string;
	buttonLabel?: string;
	buttonDisabled?: boolean;
	highlightField?: boolean;
}

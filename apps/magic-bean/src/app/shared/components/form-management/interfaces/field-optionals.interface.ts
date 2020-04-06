import { IRequest } from '../../../interfaces/request.interface';

export interface IFieldOptionals {
	hintLabel?: string;
	hintMessage?: string;
	value?: any;
	disabled?: boolean;
	options?: any[];
	iconPrefix?: string;
	iconSuffix?: string;
	request?: IRequest;
}

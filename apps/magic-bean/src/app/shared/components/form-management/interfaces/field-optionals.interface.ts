import { IRequest } from '../../../interfaces/request.interface';

export interface IFieldOptionals {
	hintLabel?: string;
	hintMessage?: string;
	value?: any;
	disabled?: boolean;
	options?: IFieldDropdown[];
	iconPrefix?: string;
	iconSuffix?: string;
	request?: IRequest;
	response?: IResponse;
}

export interface IFieldDropdown {
	label: string;
	value: any;
}

interface IResponse {
	type: 'Object' | 'Array' | 'String' | 'Number' | 'Boolean';
	keys?: string[];
	operation?: IOperation;
}

interface IOperation {
	type?: 'map' | 'filter' | 'sort';
	function?: any;
}
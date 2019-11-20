import { TMethod } from '../types/method.type.';
import { IParamSet } from './param-set.interface';
export interface IRequest {
	method: TMethod;
	path: string;
	body?: any;
	params?: IParamSet;
	expiration?: number;
}

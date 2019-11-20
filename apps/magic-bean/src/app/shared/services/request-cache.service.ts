import { Injectable } from '@angular/core';
import { IRequest } from '../interfaces/request.interface';

@Injectable({ providedIn: 'root' })
export class RequestCacheService {
	private requestTree: any;

	setCache(res: any, req: IRequest) {

	}
}
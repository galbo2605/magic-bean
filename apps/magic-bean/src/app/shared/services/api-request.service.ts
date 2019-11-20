import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRequest } from '../interfaces/request.interface';
import { HttpClient } from '@angular/common/http';
import { RequestCacheService } from './request-cache.service';
import { IParamSet } from '../interfaces/param-set.interface';

@Injectable({ providedIn: 'root' })
export class ApiRequestService {

	constructor(private http: HttpClient, private reqCacheSVC: RequestCacheService) { }

	request(req: IRequest): Observable<any> {
		const { method, path, body, params, expiration } = req;
		return this[method](path, body, params).pipe(
			catchError(this.handleError),
			tap(res => {
				// TODO: apply caching algorithm
				if (expiration) {
					this.reqCacheSVC.setCache(res, req);
				}
			})
		);
	}

	private get(path: string, params: IParamSet): Observable<any> {
		const url = `${path}`;
		return this.http.get(url, {
			params: params
		});
	}

	private post(path: string, body: any, params: IParamSet): Observable<any> {
		const url = `${path}`;
		return this.http.post(url, body, {
			params: params
		});
	}

	private delete(path: string, params: IParamSet): Observable<any> {
		const url = `${path}`;
		return this.http.delete(url, {
			params: params
		});
	}

	private handleError(error: any): Observable<any> {
		console.log(error);
		return null;
	}

}
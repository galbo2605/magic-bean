import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor() { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const newRequest = request.clone({
			url: `${environment.host}${request.url}`
		});
		return next.handle(newRequest);
	}
}
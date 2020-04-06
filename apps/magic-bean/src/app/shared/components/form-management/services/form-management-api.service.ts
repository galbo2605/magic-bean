import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api-request.service';
import { IRequest } from '../../../interfaces/request.interface';
import { EMethod } from '../../../enums/method.enum.';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IForm } from '../interfaces/form.interface';

@Injectable({ providedIn: 'root' })
export class FormManagementAPIService {
	constructor(private apiRequestSVC: ApiRequestService) { }

	getForms(): Observable<IForm[]> {
		const getRequest: IRequest = {
			method: EMethod.GET,
			path: 'form-management/getAll'
		}
		return this.sendRequest(getRequest);
	}

	saveForm(form: IForm): Observable<string> {
		const saveRequest: IRequest = {
			method: EMethod.POST,
			path: 'form-management/saveOne',
			body: form
		}
		return this.sendRequest(saveRequest);
	}

	deleteForm(form: IForm): Observable<string> {
		const deleteRequest: IRequest = {
			method: EMethod.POST,
			path: 'form-management/deleteOne',
			body: form
		}
		return this.sendRequest(deleteRequest);
	}

	private sendRequest(request: IRequest): Observable<any> {
		return this.apiRequestSVC.request(request).pipe(
			catchError(e => {
				console.log(e);
				return e;
			}),
			tap(res => console.log(res))
		);
	}
}
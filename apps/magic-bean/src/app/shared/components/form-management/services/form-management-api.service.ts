import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api-request.service';
import { IRequest } from '../../../interfaces/request.interface';
import { EMethod } from '../../../enums/method.enum.';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IField } from '../interfaces/field.interface';

@Injectable({ providedIn: 'root' })
export class FormManagementAPIService {
	constructor(private apiRequestSVC: ApiRequestService) { }

	getForms(): Observable<IField[]> {
		const getRequest: IRequest = {
			method: EMethod.GET,
			path: 'form-management/getAll'
		}
		return this.sendRequest(getRequest);
	}

	createForm(form: IField): Observable<string> {
		const createRequest: IRequest = {
			method: EMethod.POST,
			path: 'form-management/createOne',
			body: form
		}
		return this.sendRequest(createRequest);
	}

	updateForm(form: IField): Observable<string> {
		const updateRequest: IRequest = {
			method: EMethod.POST,
			path: 'form-management/updateOne',
			body: form
		}
		return this.sendRequest(updateRequest);
	}

	deleteForm(form: IField): Observable<string> {
		const updateRequest: IRequest = {
			method: EMethod.POST,
			path: 'form-management/deleteOne',
			body: form
		}
		return this.sendRequest(updateRequest);
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
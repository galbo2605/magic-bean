import { Component, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { IRequest } from '../../interfaces/request.interface';
import { ApiRequestService } from '../../services/api-request.service';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'magic-bean-request',
	template: `<magic-bean-response [response]="_request$ | async"
												(value)="responseHandler($event)"></magic-bean-response>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestComponent implements OnChanges {
	@Input() request: IRequest;
	@Output() response = new Subject<any>();

	_request$: Observable<any>
	constructor(private apiReqSVC: ApiRequestService) { }

	ngOnChanges(changes: SimpleChanges): void {
		if (this.request) {
			this._request$ = this.apiReqSVC.request(this.request);
		}
	}

	responseHandler(value: any): void {
		this.response.next(value);
	}

}

@Component({
	selector: 'magic-bean-response',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponseComponent implements OnChanges {
	@Input() response: any;
	@Output() value = new Subject<any>();

	ngOnChanges(changes: SimpleChanges): void {
		if (this.response) {
			this.value.next(this.response);
		}
	}

}
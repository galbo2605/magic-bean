import { Component, OnInit } from '@angular/core';
import { IColumns } from '../shared/interfaces/column.interface';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { Observable } from 'rxjs';

@Component({
	selector: 'magic-bean-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	columns$: Observable<IColumns[]>;

	dataSource$: any;
	constructor(private apiReqSVC: ApiRequestService) { }

	ngOnInit() {
		const colRequest: IRequest = {
			path: 'cols',
			method: EMethod.GET
		};
		this.columns$ = this.apiReqSVC.request(colRequest);
		const dataRequest: IRequest = {
			path: 'data',
			method: EMethod.GET
		};
		this.dataSource$ = this.apiReqSVC.request(dataRequest);
	}

}

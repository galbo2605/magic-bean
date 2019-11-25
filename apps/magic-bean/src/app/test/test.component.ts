import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IColumns } from '../shared/interfaces/column.interface';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { Observable } from 'rxjs';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { TestFormComponent } from '../test-form/test-form.component';

@Component({
	selector: 'magic-bean-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
	columns$: Observable<IColumns[]>;

	dataSource$: any;
	constructor(private apiReqSVC: ApiRequestService, private dialog: MatDialog) { }

	ngOnInit() {
		const colRequest: IRequest = {
			path: 'cols',
			method: EMethod.GET
		};
		this.columns$ = this.apiReqSVC.request(colRequest);
		const dataRequest: IRequest = {
			path: 'amazon-clothing-item/findAll',
			method: EMethod.GET
		};
		this.dataSource$ = this.apiReqSVC.request(dataRequest);
	}

	actions(action?: IAction): void {
		console.log(action);
		switch (action.type) {
			case 'Form Dialog':
				const dialog = this.dialog.open(TestFormComponent, {
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 100px)',
					data: {
						test: 'hello world'
					},
					disableClose: true,
				});
				dialog.afterClosed().pipe(take(1)).subscribe(res => {
					console.log(`Dialog result`, res);
					switch (res.type) {
						case 'save':
							const dataRequest: IRequest = {
								path: 'amazon-clothing-item/createOne',
								method: EMethod.POST,
								body: res.payload
							};
							this.apiReqSVC.request(dataRequest).pipe(take(1)).subscribe(res1 => {
								console.log('api response: ', res1);
							});
							break;
						default:
							break;
					}
				});
				break;
			default:
				break;
		}
	}

}

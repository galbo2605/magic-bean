import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { IRequest } from '../../shared/interfaces/request.interface';
import { ApiRequestService } from '../../shared/services/api-request.service';
import { IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { EMethod } from '../../shared/enums/method.enum.';
import { take } from 'rxjs/operators';
import { TableService } from '../../shared/components/table/services/table.service';

@Injectable({ providedIn: 'root' })
export class TestService {

	constructor(private apiReqSVC: ApiRequestService, private tableService: TableService) { }

	private sendRequest(request: IRequest): Observable<any> {
		return this.apiReqSVC.request(request);
	}

	getImportRecords(fromDate: Date, toDate: Date): Observable<IAmazonClothingItem[]> {
		const exportRequest: IRequest = {
			path: `amazon-clothing-item/export`,
			method: EMethod.POST,
			body: { fromDate, toDate }
		};
		return this.sendRequest(exportRequest);
	}

	create(amazonClothingItem: IAmazonClothingItem, tableName?: string): void {
		const saveRequest: IRequest = {
			path: `amazon-clothing-item/updateOne`,
			method: EMethod.POST,
			body: amazonClothingItem
		};
		this.sendRequest(saveRequest).pipe(take(1)).subscribe((savedItem: IAmazonClothingItem) => {
			console.log('api response: ', savedItem);
			this.tableService.readRows(null, 'parentTable');
		});
	}

	update(amazonClothingItem: IAmazonClothingItem, tableName?: string): void {
		const saveRequest: IRequest = {
			path: `amazon-clothing-item/updateOne`,
			method: EMethod.POST,
			body: amazonClothingItem
		};
		this.sendRequest(saveRequest).pipe(take(1)).subscribe((savedItem: string) => {
			console.log('api response: ', savedItem);
			this.tableService.updateRow('UID', amazonClothingItem.UID, amazonClothingItem, tableName);
		});
	}

	delete(amazonClothingItem: IAmazonClothingItem, tableName?: string): void {
		const deleteRequest: IRequest = {
			path: 'amazon-clothing-item/deleteOne',
			method: EMethod.POST,
			body: amazonClothingItem
		};
		this.sendRequest(deleteRequest).pipe(take(1)).subscribe(res => {
			console.log(res);
			this.tableService.readRows(null, 'parentTable');
		});
	}
}
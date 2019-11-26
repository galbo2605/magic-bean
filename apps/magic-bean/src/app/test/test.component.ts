import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IColumns } from '../shared/interfaces/column.interface';
import { ApiRequestService } from '../shared/services/api-request.service';
import { IRequest } from '../shared/interfaces/request.interface';
import { EMethod } from '../shared/enums/method.enum.';
import { Observable } from 'rxjs';
import { IAction } from '../shared/interfaces/action.interface';
import { MatDialog } from '@angular/material';
import { take, map } from 'rxjs/operators';
import { TestFormComponent } from '../test-form/test-form.component';
import { TableService } from '../shared/components/table/services/table.service';
import { ITableActionItems } from '../shared/components/table/interfaces/table-action-items.interfaces';
import * as XLSX from 'xlsx';
import { IAmazonClothingItem } from '@magic-bean/api-interfaces';
type AOA = any[][];

@Component({
	selector: 'magic-bean-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
	columns$: Observable<IColumns[]>;
	colRequest: IRequest = {
		path: 'cols',
		method: EMethod.GET
	};
	dataSource$: Observable<any[]>;
	dataRequest: IRequest = {
		path: 'amazon-clothing-item/findAll',
		method: EMethod.GET
	};
	childrenDataRequest: IRequest = {
		path: 'amazon-clothing-item/getChildren',
		method: EMethod.POST,
	};
	dataCount$: Observable<number>;
	childActionItems: ITableActionItems[];
	actionItems: ITableActionItems[] = [
		{ icon: 'expand', label: 'Expand', color: 'accent', type: 'expand' },
		{ icon: 'edit', label: 'Edit', color: 'primary', type: 'edit' },
		{ icon: 'delete', label: 'Delete', color: 'warn', type: 'delete' }
	];

	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	constructor(private apiReqSVC: ApiRequestService, private dialog: MatDialog, private tableService: TableService) { }

	ngOnInit() {
		this.columns$ = this.apiReqSVC.request(this.colRequest);
		this.dataSource$ = this.apiReqSVC.request(this.dataRequest);
		const dataCountRequest: IRequest = {
			path: 'amazon-clothing-item/allCount',
			method: EMethod.GET
		};
		this.dataCount$ = this.apiReqSVC.request(dataCountRequest);
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
							const saveRequest: IRequest = {
								path: 'amazon-clothing-item/createOne',
								method: EMethod.POST,
								body: res.payload
							};
							this.apiReqSVC.request(saveRequest).pipe(take(1)).subscribe(res1 => {
								console.log('api response: ', res1);
							});
							break;
						default:
							break;
					}
				});
				break;
			case 'edit':
				const dialog2 = this.dialog.open(TestFormComponent, {
					width: 'calc(100% - 100px)',
					height: 'calc(100% - 100px)',
					data: action.payload,
					disableClose: true,
				});
				dialog2.afterClosed().pipe(take(1)).subscribe(res => {
					console.log(`Dialog result`, res);
					switch (res.type) {
						case 'save':
							const saveRequest: IRequest = {
								path: 'amazon-clothing-item/updateOne',
								method: EMethod.POST,
								body: res.payload
							};
							this.apiReqSVC.request(saveRequest).pipe(take(1)).subscribe(res1 => {
								this.tableService.updateRow('UID', res1.UID, res1);
							});
							break;
						default:
							break;
					}
				});
				break;
			case 'delete':
				const deleteRequest: IRequest = {
					path: 'amazon-clothing-item/deleteOne',
					method: EMethod.POST,
					body: action.payload
				};
				this.apiReqSVC.request(deleteRequest).pipe(take(1)).subscribe(res => {
					this.tableService.deleteRow('UID', action.payload.UID, action.payload);
				});
				break;
			case 'expand':
				console.log('expanded', action);
				this.childrenDataRequest.body = action.payload;
				this.childActionItems = this.actionItems.filter(actionItem => actionItem.type !== 'expand');
				break;
		}
	}

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			const colMap = {
				'Seller SKU': 'SKU',
				'Product Name': 'Title',
				'Brand Name': 'Brand',
				'Product Description': 'Description',
				'Item Type Keyword': 'Item_Type',
				'Standard Price': 'Price',
				'Fulfillment Latency': 'Days_Till_Ready',
				'Quantity': 'Quantity',
				'Key Product Features1': 'Bullet_Point_1',
				'Key Product Features2': 'Bullet_Point_2',
				'Key Product Features3': 'Bullet_Point_3',
				'Key Product Features4': 'Bullet_Point_4',
				'Key Product Features5': 'Bullet_Point_5',
				'Key Product Features6': 'Bullet_Point_6',
				'Key Product Features7': 'Bullet_Point_7',
				'Search Terms': 'Keywords',
				'Main Image URL': 'Main_Image',
				'Other Image URL1': 'Image2',
				'Other Image URL2': 'Image3',
				'Other Image URL3': 'Image2',
				'Parentage': 'Parent_Child',
				'Parent SKU': 'Parent_SKU',
				'Relationship Type': 'Relationship',
				'Variation Theme': 'Variation_Theme',
				'Color': 'Color',
				'Color Map': 'Color_Map',
				'Department': 'Department',
				'Fabric Type': 'Fabric_Type',
				'Size': 'Size',
				'Shipping-Template': 'Shipping_Template',
				'Size Map': 'Size_Map',
			};
			const colArr = data[1];
			const newData: IAmazonClothingItem[] = [];
			data.forEach((row: string[], arrIndex) => {
				if (arrIndex > 2) {
					const newItem: IAmazonClothingItem = {};
					row.forEach((cell,cellIndex) => {
						if (cell) {
							const col = colArr[cellIndex];
							const amazonCol = colMap[col];
							newItem[amazonCol] = cell;
						}
					});
					newData.push(newItem);
				}
			});
			console.log(newData);
			const saveRequest: IRequest = {
				path: 'amazon-clothing-item/import',
				method: EMethod.POST,
				body: newData
			};
			this.apiReqSVC.request(saveRequest).pipe(take(1)).subscribe(res1 => {
				console.log('api response: ', res1);
			});
		};
		reader.readAsBinaryString(target.files[0]);
	}

}

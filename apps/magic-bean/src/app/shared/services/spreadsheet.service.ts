import { Injectable } from '@angular/core';
import { IAmazonClothingItem } from '@magic-bean/api-interfaces';
import { IRequest } from '../interfaces/request.interface';
import { EMethod } from '../enums/method.enum.';
import { ApiRequestService } from './api-request.service';
import * as XLSX from 'xlsx';
import { take } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
type AOA = any[][];

@Injectable({ providedIn: 'root' })
export class SpeardSheetService {

	constructor(private apiReqSVC: ApiRequestService) { }

	getDataFromFile(evt: any): Observable<IAmazonClothingItem[]> {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		return from(new Promise<any>((res, rej) => {
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
						row.forEach((cell, cellIndex) => {
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
				res(newData);
			};
			reader.readAsBinaryString(target.files[0]);
		}).catch(e => e));
	}

	export(data: AOA = [[]], fileName: string = 'SheetJS.xlsx'): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, fileName);
	}
}
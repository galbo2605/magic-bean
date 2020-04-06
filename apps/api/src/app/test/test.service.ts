import { Injectable } from '@nestjs/common';
import { AmazonClothingItemEntity, FormManagementEntity } from '@magic-bean/api-interfaces';

@Injectable()
export class TestService {
	getAmazonCols(): any[] {
		const keys: string[] = Object.getOwnPropertyNames(new AmazonClothingItemEntity());
		return this.columns(keys);
	}
	
	getFormCols(): any[] {
		const keys: string[] = Object.getOwnPropertyNames(new FormManagementEntity());
		return this.columns(keys);
	}

	columns(keys: string[]): any[] {
		const cols: { id: string, name: string }[] = [];
		keys.forEach(key => {
			const id = key;
			const name = key.split('_').join(' ');
			cols.push({ id, name });
		});
		return cols;
	}
}

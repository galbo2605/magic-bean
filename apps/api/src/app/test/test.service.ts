import { Injectable } from '@nestjs/common';
import { AmazonClothingItemEntity } from '@magic-bean/api-interfaces';

@Injectable()
export class TestService {
	getCols(): any[] {
		const cols: { id: string, name: string }[] = [];
		const keys = Object.getOwnPropertyNames(new AmazonClothingItemEntity());
		keys.forEach(key => {
			const id = key;
			const name = key.split('_').join(' ');
			cols.push({ id, name });
		});
		return cols;
	}
}

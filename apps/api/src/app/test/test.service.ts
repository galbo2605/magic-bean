import { Injectable } from '@nestjs/common';
import { Message, AmazonClothingItemEntity } from '@magic-bean/api-interfaces';

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

	getData(): any[] {
		return [
			{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
			{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
			{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
			{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
			{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
			{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
			{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
			{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
			{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
			{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
		];
	}
}

class Describer {
	private static FRegEx = new RegExp(/(?:this\.)(.+?(?= ))/g);
	static describe(val: any, parent = false): string[] {
		let result = [];
		if (parent) {
			const proto = Object.getPrototypeOf(val.prototype);
			if (proto) {
				result = result.concat(this.describe(proto.constructor, parent));
			}
		}
		result = result.concat(val.toString().match(this.FRegEx) || []);
		return result;
	}
}
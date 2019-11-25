export interface IColumns {
	id: string;
	name: string;
	type?: string;
	sorting?: 'ASC' | 'DESC';
	filters?: any;
	visible?: boolean;
	order?: number;
}

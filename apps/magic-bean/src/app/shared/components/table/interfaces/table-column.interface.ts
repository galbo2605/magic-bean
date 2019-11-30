export interface ITableColumns {
	columns: IColumn[];
	columnIDs: string[];
}

interface IColumn {
	id: string;
	name: string;
	type?: string;
	sorting?: 'ASC' | 'DESC';
	filters?: any;
	visible?: boolean;
	order?: number;
}
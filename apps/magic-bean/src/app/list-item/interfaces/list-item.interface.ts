export interface ITodoItem {
	id: string;
	value: string;
	checked: boolean;
	mode: 'update' | 'read';
}

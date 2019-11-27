import { IAction } from '../../../interfaces/action.interface';

export interface ITableAction extends IAction {
	tableName: string;
}
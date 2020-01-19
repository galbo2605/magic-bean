export interface IFieldValidators {
	required?: boolean;
	min?: number;
	max?: number;
	/** number of increments in decimal steps (or whole numbers) */
	step?: number;
}

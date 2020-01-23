import { IForm } from '../../interfaces/form.interface';
import { EFieldType } from '../../enums/field-type.enum';

const mandatories: IForm[] = [
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'formName', placeholder: 'Form Name', required: true },
	{ formName: 'formEditor', type: EFieldType.DROPDOWN, controlName: 'type', placeholder: 'Type', options: [EFieldType.TEXT, EFieldType.NUMBER, EFieldType.EMAIL, EFieldType.DROPDOWN], required: true },
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'controlName', placeholder: 'Field Name', required: true },
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'placeholder', placeholder: 'Placeholder', required: true }
];
const validators: IForm[] = [
	{ formName: 'formEditor', type: EFieldType.CHECKBOX, controlName: 'required', placeholder: 'Required', hintMessage: 'check if this is mandatory' },
	{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'min', placeholder: 'Minimum Value' },
	{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'max', placeholder: 'Maximum Value' },
	{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'step', placeholder: 'Decimal Steps', hintLabel: 'number of steps in each increase/decrease of the field' }
];
const optionals: IForm[] = [
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'hintLabel', placeholder: 'Hint Label' },
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'hintMessage', placeholder: 'Hint Message' },
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'value', placeholder: 'Initial Default Value' },
	{ formName: 'formEditor', type: EFieldType.CHECKBOX, controlName: 'disabled', placeholder: 'Disabled', hintMessage: 'check to disabled/enabled by default' },
	{ formName: 'formEditor', type: EFieldType.TEXT, controlName: 'options', placeholder: 'Dropdown Options', hintLabel: 'comma seperated values' }
];
const misc: IForm[] = [
	{ formName: 'formEditor', type: EFieldType.NUMBER, controlName: 'orderPosition', placeholder: 'Order Position', hintLabel: 'position of the field in the form' }
];

export const editorFields = [].concat(mandatories, validators, optionals, misc);
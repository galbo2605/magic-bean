import { IForm } from '../../interfaces/form.interface';
import { IField } from '../../interfaces/field.interface';
import { EFieldType } from '../../enums/field-type.enum';

const mandatories: IField[] = [
	{ type: EFieldType.DROPDOWN, controlName: 'type', placeholder: 'Type', options: [{ label: EFieldType.TEXT, value: EFieldType.TEXT }, { label: EFieldType.NUMBER, value: EFieldType.NUMBER }, { label: EFieldType.EMAIL, value: EFieldType.EMAIL }, { label: EFieldType.DROPDOWN, value: EFieldType.DROPDOWN }], required: true },
	{ type: EFieldType.TEXT, controlName: 'controlName', placeholder: 'Field Name', required: true },
	{ type: EFieldType.TEXT, controlName: 'placeholder', placeholder: 'Placeholder', required: true }
];
const validators: IField[] = [
	{ type: EFieldType.CHECKBOX, controlName: 'required', placeholder: 'Required', hintMessage: 'check if this is mandatory' },
	{ type: EFieldType.NUMBER, controlName: 'min', placeholder: 'Minimum Value' },
	{ type: EFieldType.NUMBER, controlName: 'max', placeholder: 'Maximum Value' },
	{ type: EFieldType.NUMBER, controlName: 'step', placeholder: 'Decimal Steps', hintLabel: 'number of steps in each increase/decrease of the field' }
];
const optionals: IField[] = [
	{ type: EFieldType.TEXT, controlName: 'hintLabel', placeholder: 'Hint Label' },
	{ type: EFieldType.TEXT, controlName: 'hintMessage', placeholder: 'Hint Message' },
	{ type: EFieldType.TEXT, controlName: 'value', placeholder: 'Initial Default Value' },
	{ type: EFieldType.CHECKBOX, controlName: 'disabled', placeholder: 'Disabled', hintMessage: 'check to disabled/enabled by default' },
	{ type: EFieldType.TEXT, controlName: 'options', placeholder: 'Dropdown Options', hintLabel: 'comma seperated values' }
];
const misc: IField[] = [
	{ type: EFieldType.NUMBER, controlName: 'orderPosition', placeholder: 'Order Position', hintLabel: 'position of the field in the form' }
];

export default {
	name: 'Form Editor',
	subtitle: 'Field Properties',
	mode: 'Write',
	removableFields: false,
	buttonLabel: 'Save Field',
	fields: [].concat(mandatories, validators, optionals, misc)
} as IForm;
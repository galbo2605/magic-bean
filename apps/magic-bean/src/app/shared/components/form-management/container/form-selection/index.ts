import { EFieldType } from '../../enums/field-type.enum';
import { IForm } from '../../interfaces/form.interface';

export default {
	name: 'Form Selection',
	editing: true,
	mode: 'Read',
	subtitle: 'Select a Form to Edit',
	buttonLabel: 'Load Form',
	fields: [
		{
			type: EFieldType.DROPDOWN, controlName: 'formList', placeholder: 'Forms List', options: ['Amazon Clothing', 'New Form']
		}
	]
} as IForm;
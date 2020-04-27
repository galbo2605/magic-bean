import { EFieldType } from '../../enums/field-type.enum';
import { IForm } from '../../interfaces/form.interface';
import { EMethod } from '../../../../enums/method.enum.';

export default {
	name: 'Form Selection',
	editing: true,
	mode: 'Read',
	subtitle: 'Select a Form to Edit',
	buttonLabel: 'Load Form',
	fields: [
		{
			type: EFieldType.DROPDOWN, controlName: 'formList', placeholder: 'Forms List', options: [{ label: 'Amazon Clothing', value: 'Amazon Clothing' }, { label: 'New Form', value: 'New Form' }],
			request: {
				method: EMethod.GET,
				path: 'form-management/getAll'
			},
			response: {
				type: 'Object',
				keys: ['records'],
				operation: {
					type: 'map',
					function: `(item, index, array) => { return { label: '', value: '' }; }`
				}
			}
		}
	]
} as IForm;
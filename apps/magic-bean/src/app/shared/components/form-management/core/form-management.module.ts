import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../core/shared.module';

import { FormManagementComponent } from '../container/form-management.component';
import { FormEditorComponent } from '../components/form-editor/form-editor.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { FormTableComponent } from '../components/form-table/form-table.component';

const formEditorRoutes: Routes = [
	{ path: '', component: FormManagementComponent },
	{ path: 'table', component: FormTableComponent },
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(formEditorRoutes),
		ReactiveFormsModule,
		SharedModule,
	],
	declarations: [
		FormManagementComponent,
		FormTableComponent,
		FormEditorComponent,
		FormFieldComponent
	],
	exports: [
		FormManagementComponent,
		FormTableComponent,
		FormEditorComponent,
		FormFieldComponent
	]
})
export class FormManagementModule { }
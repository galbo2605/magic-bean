import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../core/shared.module';

import { FormManagementComponent } from '../container/form-management.component';
import { FormEditorComponent } from '../components/form-editor/form-editor.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';

const formEditorRoutes: Routes = [
	{ path: '', component: FormManagementComponent }
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
		FormEditorComponent,
		FormFieldComponent
	],
	exports: [
		FormManagementComponent,
		FormEditorComponent,
		FormFieldComponent
	]
})
export class FormManagementModule { }
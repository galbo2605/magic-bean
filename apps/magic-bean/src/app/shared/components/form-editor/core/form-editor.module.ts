import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditorComponent } from '../container/form-editor.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const formEditorRoutes: Routes = [
	{ path: '', component: FormEditorComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(formEditorRoutes),
		ReactiveFormsModule,
		SharedModule,
	],
	declarations: [FormEditorComponent],
	exports: []
})
export class FormEditorModule { }
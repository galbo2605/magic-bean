import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEditorComponent } from '../form-editor.component';

const formEditorRoutes: Routes = [
	{ path: '', component: FormEditorComponent }
];

@NgModule({
	imports: [RouterModule.forChild(formEditorRoutes)],
	declarations: [FormEditorComponent],
	exports: []
})
export class FormEditorModule { }
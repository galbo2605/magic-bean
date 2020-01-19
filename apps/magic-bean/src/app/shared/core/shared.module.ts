import { NgModule } from '@angular/core';
import { TableComponent } from '../components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportComponent } from '../components/export/export.component';
import { RotatingCubeComponent } from '../components/rotating-cube/rotating-cube.component';
import { MaterialModule } from './material.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	exports: [
		MaterialModule,
		TableComponent,
		ButtonComponent,
		RotatingCubeComponent
	],
	declarations: [
		TableComponent,
		ButtonComponent,
		ExportComponent,
		RotatingCubeComponent
	],
	entryComponents: [
		ExportComponent
	]
})
export class SharedModule { }
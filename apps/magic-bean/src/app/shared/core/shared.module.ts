import { NgModule } from '@angular/core';
import * as MaterialModules from '@angular/material';
import { TableComponent } from '../components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { FormFieldComponent } from '../components/form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExportComponent } from '../components/export/export.component';
import { RotatingCubeComponent } from '../components/rotating-cube/rotating-cube.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModules.MatBottomSheetModule,
		MaterialModules.MatCardModule,
		MaterialModules.MatIconModule,
		MaterialModules.MatAutocompleteModule,
		MaterialModules.MatLineModule,
		MaterialModules.MatBadgeModule,
		MaterialModules.MatButtonModule,
		MaterialModules.MatListModule,
		MaterialModules.MatTableModule,
		MaterialModules.MatToolbarModule,
		MaterialModules.MatTooltipModule,
		MaterialModules.MatChipsModule,
		MaterialModules.MatStepperModule,
		MaterialModules.MatSortModule,
		MaterialModules.MatSnackBarModule,
		MaterialModules.MatSliderModule,
		MaterialModules.MatSidenavModule,
		MaterialModules.MatSlideToggleModule,
		MaterialModules.MatSelectModule,
		MaterialModules.MatRadioModule,
		MaterialModules.MatProgressSpinnerModule,
		MaterialModules.MatProgressBarModule,
		MaterialModules.MatPaginatorModule,
		MaterialModules.MatNativeDateModule,
		MaterialModules.MatMenuModule,
		MaterialModules.MatInputModule,
		MaterialModules.MatGridListModule,
		MaterialModules.MatFormFieldModule,
		MaterialModules.MatExpansionModule,
		MaterialModules.MatDividerModule,
		MaterialModules.MatDialogModule,
		MaterialModules.MatDatepickerModule,
		MaterialModules.MatCheckboxModule,
		MaterialModules.MatButtonToggleModule,
		MaterialModules.MatOptionModule,
	],
	exports: [
		MaterialModules.MatBottomSheetModule,
		MaterialModules.MatCardModule,
		MaterialModules.MatIconModule,
		MaterialModules.MatAutocompleteModule,
		MaterialModules.MatLineModule,
		MaterialModules.MatBadgeModule,
		MaterialModules.MatButtonModule,
		MaterialModules.MatListModule,
		MaterialModules.MatTableModule,
		MaterialModules.MatToolbarModule,
		MaterialModules.MatTooltipModule,
		MaterialModules.MatChipsModule,
		MaterialModules.MatStepperModule,
		MaterialModules.MatSortModule,
		MaterialModules.MatSnackBarModule,
		MaterialModules.MatSliderModule,
		MaterialModules.MatSidenavModule,
		MaterialModules.MatSlideToggleModule,
		MaterialModules.MatSelectModule,
		MaterialModules.MatRadioModule,
		MaterialModules.MatProgressSpinnerModule,
		MaterialModules.MatProgressBarModule,
		MaterialModules.MatPaginatorModule,
		MaterialModules.MatNativeDateModule,
		MaterialModules.MatMenuModule,
		MaterialModules.MatInputModule,
		MaterialModules.MatGridListModule,
		MaterialModules.MatFormFieldModule,
		MaterialModules.MatExpansionModule,
		MaterialModules.MatDividerModule,
		MaterialModules.MatDialogModule,
		MaterialModules.MatDatepickerModule,
		MaterialModules.MatCheckboxModule,
		MaterialModules.MatButtonToggleModule,
		MaterialModules.MatOptionModule,
		TableComponent,
		ButtonComponent,
		FormFieldComponent,
		RotatingCubeComponent
	],
	declarations: [
		TableComponent,
		ButtonComponent,
		FormFieldComponent,
		ExportComponent,
		RotatingCubeComponent
	],
	entryComponents: [
		ExportComponent
	]
})
export class SharedModule { }
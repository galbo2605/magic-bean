import { NgModule } from '@angular/core';
import * as MaterialModules from '@angular/material';
import { TableComponent } from '../components/table/table.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
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
		TableComponent
	],
	declarations: [
		TableComponent
	]
})
export class SharedModule { }
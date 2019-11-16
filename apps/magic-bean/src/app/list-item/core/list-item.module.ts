import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListItemComponent } from '../components/list-item/list-item.component';
import { MatGridListModule, MatInputModule, MatListModule, MatButtonModule } from '@angular/material';
import { ListItemContainerComponent } from '../container/list-item-container/list-item-container.component';
import { ListItemRoutingModule } from './list-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ListItemContainerComponent,
		ListItemComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ListItemRoutingModule,
		MatInputModule,
		MatGridListModule,
		MatListModule,
		MatButtonModule
	],
	providers: []
})
export class ListItemModule { }

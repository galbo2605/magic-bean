import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListItemComponent } from '../components/list-item/list-item.component';
import { ListItemContainerComponent } from '../container/list-item-container/list-item-container.component';
import { ListItemRoutingModule } from './list-item-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/core/shared.module';

@NgModule({
	declarations: [
		ListItemContainerComponent,
		ListItemComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ListItemRoutingModule,
		SharedModule
	],
	providers: []
})
export class ListItemModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemContainerComponent } from '../container/list-item-container/list-item-container.component';

const routes: Routes = [
	{ path: '', component: ListItemContainerComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ListItemRoutingModule { }

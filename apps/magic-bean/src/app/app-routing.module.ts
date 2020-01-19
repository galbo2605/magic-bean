import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
	{ path: '', component: TestComponent },
	{ path: 'form-management', loadChildren: () => import('./shared/components/form-management/core/form-management.module').then(m => m.FormManagementModule) },
	{ path: 'todo', loadChildren: () => import('./list-item/core/list-item.module').then(m => m.ListItemModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

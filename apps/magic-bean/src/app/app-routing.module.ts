import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
	{ path: '', component: TestComponent },
	{ path: 'todo', loadChildren: () => import('./list-item/core/list-item.module').then(m => m.ListItemModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

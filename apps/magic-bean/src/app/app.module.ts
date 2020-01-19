import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/core/shared.module';
import { TestComponent } from './test/test.component';
import { RequestInterceptor } from './request.interceptor';
import { TestFormComponent } from './test-form/test-form.component';
import { FormManagementModule } from './shared/components/form-management/core/form-management.module';

@NgModule({
	declarations: [
		AppComponent,
		TestComponent,
		TestFormComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		AppRoutingModule,
		SharedModule,
		FormManagementModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
	],
	entryComponents: [TestFormComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }

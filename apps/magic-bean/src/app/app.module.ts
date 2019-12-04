import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/core/shared.module';
import { TestComponent, ExportComponent } from './test/test.component';
import { RequestInterceptor } from './request.interceptor';
import { TestFormComponent } from './test-form/test-form.component';

@NgModule({
	declarations: [
		AppComponent,
		TestComponent,
		TestFormComponent,
		ExportComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		AppRoutingModule,
		SharedModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
	],
	entryComponents: [TestFormComponent, ExportComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }

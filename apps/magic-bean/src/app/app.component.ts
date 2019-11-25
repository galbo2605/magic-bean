import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@magic-bean/api-interfaces';
import { Observable } from 'rxjs';

@Component({
	selector: 'magic-bean-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	hello$ = this.http.get<Message>('/api/hello');
	showNav: boolean;

	imageItems: Observable<any[]>;

	constructor(private http: HttpClient) { }
}

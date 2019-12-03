import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'magic-bean-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	showNav: boolean;

	imageItems: Observable<any[]>;

}

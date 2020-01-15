import { Component, OnInit, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { IAction } from '../../interfaces/action.interface';

@Component({
	selector: 'magic-bean-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
	@Input() type = 'button';
	@Input() label: string;
	@Input() disabled: boolean;
	@Input() styleType: string;
	@Input() color: string;
	@Output() btnClick = new Subject<IAction>();

	constructor() { }

	ngOnInit() {
	}

	outputClick() {
		this.btnClick.next({ type: this.label, payload: this.label });
	}

}

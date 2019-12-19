import { Component, OnInit, HostListener, ContentChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil, switchMapTo, debounceTime } from 'rxjs/operators';

const bigStep = 5;
const smallStep = 1;

@Component({
	selector: 'magic-bean-rotating-cube',
	templateUrl: './rotating-cube.component.html',
	styleUrls: ['./rotating-cube.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotatingCubeComponent implements OnInit {
	@ContentChild('front', { static: true }) frontContentTmpl: TemplateRef<any>;
	@ContentChild('right', { static: true }) rightContentTmpl: TemplateRef<any>;
	@ContentChild('back', { static: true }) backContentTmpl: TemplateRef<any>;
	@ContentChild('left', { static: true }) leftContentTmpl: TemplateRef<any>;
	transformFront: SafeStyle | undefined;
	transformRight: SafeStyle | undefined;
	transformBack: SafeStyle | undefined;
	transformLeft: SafeStyle | undefined;
	rotx = 0;
	roty = 0;
	rotz = 0;
	extras = '';

	mouseDown = new Subject<MouseEvent>();
	mouseMove = new Subject<MouseEvent>();
	mouseUp = new Subject<MouseEvent>();
	mouseLeave = new Subject<MouseEvent>();
	mouseXClickLocation: number;
	mouseXDistance: number;
	mouseXPrevDistance = 0;

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.mouseDown.pipe(
			switchMapTo(this.mouseMove.pipe(
				takeUntil(this.mouseUp),
				takeUntil(this.mouseLeave),
			)),
			debounceTime(1)
		).subscribe(mouseMove => {
			this.rotate(mouseMove);
		});
	}

	@HostListener('mousedown', ['$event'])
	onMouseDown(event: MouseEvent) {
		event.preventDefault();
		this.mouseXPrevDistance = 0;
		this.mouseXClickLocation = event.clientX;
		this.mouseDown.next(event);
	}

	@HostListener('mousemove', ['$event'])
	onMouseMove(event: MouseEvent) {
		event.preventDefault();
		this.mouseMove.next(event);
	}

	@HostListener('mouseup', ['$event'])
	onMouseUp(event: MouseEvent) {
		event.preventDefault();
		this.mouseUp.next(event);
	}

	@HostListener('mouseleave', ['$event'])
	onMouseLeave(event: MouseEvent) {
		event.preventDefault();
		this.mouseLeave.next(event);
	}

	rotate(event: MouseEvent): void {
		console.log('rotating', event);
		const mouseXMoveLocation = event.clientX;
		this.mouseXDistance = mouseXMoveLocation - this.mouseXClickLocation;
		const mouseXDistancePixelDifference = this.mouseXDistance - this.mouseXPrevDistance;
		const step = event.shiftKey ? bigStep : smallStep;
		this.roty += mouseXDistancePixelDifference;
		this.mouseXPrevDistance = this.mouseXDistance;

		switch (event.type) {

			// Reset everything back to the start state
			//
			case 'Space': {
				this.rotx = 0;
				this.roty = 0;
				this.rotz = 0;
				this.extras = '';
			} break;

			// Rotate around X, Y, and Z axes, in big or small increments
			//
			case 'ArrowUp': {
				this.rotx += step;
			} break;
			case 'ArrowDown': {
				this.rotx -= step;
			} break;
			case 'ArrowLeft': {
				this.roty -= step;
			} break;
			case 'ArrowRight': {
				this.roty += step;
			} break;
			case 'KeyZ': {
				this.rotz -= step;
			} break;
			case 'KeyX': {
				this.rotz += step;
			} break;

			// Get funky
			case 'KeyD': {
				this.extras = this.extras ? '' : 'disco';
			} break;
		}

		this.calculateTransformations();
	}

	calculateTransformations() {
		const frontYRot = ['front', this.roty];
		const rightYRot = ['right', this.roty + 90];
		const backYRot = ['back', this.roty - 180];
		const leftYRot = ['left', this.roty - 90];
		const rotYArr = [frontYRot, rightYRot, backYRot, leftYRot];
		for (let i = 0; i < rotYArr.length; i++) {
			const [side, rotateYValue] = rotYArr[i];

			const rotation = `rotateX(${this.rotx}deg) rotateY(${rotateYValue}deg) rotateZ(${this.rotz}deg) perspective(1000px)`;
			switch (side) {
				case 'front':
					this.transformFront = this.sanitizer.bypassSecurityTrustStyle(rotation);
					break;
				case 'right':
					this.transformRight = this.sanitizer.bypassSecurityTrustStyle(rotation);
					break;
				case 'back':
					this.transformBack = this.sanitizer.bypassSecurityTrustStyle(rotation);
					break;
				case 'left':
					this.transformLeft = this.sanitizer.bypassSecurityTrustStyle(rotation);
					break;
			}
		}
	}

}

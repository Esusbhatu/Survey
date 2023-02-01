import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	@Input() leftButtonText!: string;
	@Input() rightButtonText!: string;
	@Input() headerText!: string;
	@Input() showHeader: boolean = true;
	@Input() showRightButton: boolean = true;
	@Input() showRightButtonIcon: boolean = true;
	@Input() RightButtonIconClass!: string;

	@Output() leftButtonClick = new EventEmitter<void>();
	@Output() rightButtonClick = new EventEmitter<void>();
}

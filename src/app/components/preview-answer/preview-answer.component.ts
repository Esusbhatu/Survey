import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-preview-answer',
	templateUrl: './preview-answer.component.html',
	styleUrls: ['./preview-answer.component.scss']
})

export class PreviewAnswerComponent implements OnInit {
	headerLeftButtonText: string = 'Enquêtes';
	headerText: string = 'Test';

	public surveyInfo?: any = [];
	public answerData?: any;
	public surveyIds?: string[] = [];

	constructor() { }

	ngOnInit(): void {
		for (let i = 0; i < localStorage.length; i++) {
			this.surveyInfo?.push(JSON.parse(localStorage.getItem(localStorage.key(i)!) || '{}'));
			this.surveyIds?.push(localStorage.key(i)!);
		}
	}

	onLeftButtonClickInHeader() {
		this.answerData = undefined;
	}
}
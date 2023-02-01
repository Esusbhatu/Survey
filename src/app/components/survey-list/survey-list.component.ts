import { Question } from './../../classes/question.class';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { Survey } from 'src/app/classes/survey.class';
import { AlertBoxService } from 'src/app/service/alert-box-service/alert-box.service';
import { LocalStorageService } from 'src/app/service/local-storage-service/local-storage.service';

@Component({
	selector: 'app-survey-list',
	templateUrl: './survey-list.component.html',
	styleUrls: ['./survey-list.component.scss'],
})

export class SurveyListComponent implements OnInit, OnDestroy {
	public selectedArrayIndex: number = 0;
	surveyList: Array<Survey> = new Array<Survey>;
	filterType: any = 'none';
	filteredSurveys: any;
	unsubscribe$ = new Subject<void>();

	headerLeftButtonText: string = 'Home';
	headerText: string = 'Enquêtes';

	onLeftButtonClickInHeader() {
		this.router.navigateByUrl('/home');
	}

	onRightButtonClickInHeader() {
		this.router.navigateByUrl('/survey/create');
	}

	constructor(
		public serviceSurveyList: LocalStorageService,
		public router: Router,
		private alertBoxService: AlertBoxService,
	) { }

	ngOnInit(): void {
		this.serviceSurveyList.getSurveys()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((surveyData: Survey[]) => {
				surveyData.map((x: Survey) => {
					const tmpSurvey = new Survey(x);
					tmpSurvey.questions = x.questions.map((y: any) => new Question(y));
					this.surveyList.push(tmpSurvey);
				});
			});
		this.filter();
	}

	public filter(filterTerm?: string): void {
		if (this.filterType === 'none') {
			this.filteredSurveys = this.surveyList;
		} else {
			if (filterTerm !== '') {
				this.filterType = Number(this.filterType);
				this.serviceSurveyList.filterSurvey(this.filterType, filterTerm!)
					.pipe(takeUntil(this.unsubscribe$))
					.subscribe(data => {
						if ((data as Array<Survey>).length != 0) {
							this.filteredSurveys = data.map((d: Survey) => new Survey(d));
						} else {
							this.filteredSurveys = null;
						}
					})
			} else {
				this.filteredSurveys = this.surveyList;
			}
		}
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

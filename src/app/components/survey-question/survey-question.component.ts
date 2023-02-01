import { Component, OnInit, OnDestroy, HostListener, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/local-storage-service/local-storage.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertBoxService } from 'src/app/service/alert-box-service/alert-box.service';
import { Question } from 'src/app/classes/question.class';

@Component({
	selector: 'app-survey-question',
	templateUrl: './survey-question.component.html',
	styleUrls: ['./survey-question.component.scss'],
})
export class SurveyQuestionComponent implements OnInit, OnDestroy {
	formGroup!: FormGroup;
	public surveyId: string;
	public surveyInfo: any;
	public questionInfo: Question[] = [];
	public questions: any;
	private skipAlert: boolean = false;
	public copied?: boolean = false;
	unsubscribe$ = new Subject<void>();
	showButton!: boolean;





	@HostListener('window:keydown.shift', ['$event'])
	keyDown() {
		this.skipAlert = true;
	}
	@HostListener('window:keyup.shift', ['$event'])
	keyUp() {
		this.skipAlert = false;
	}

	headerLeftButtonText: string = 'Enquêtes';
	headerRightButtonText!: string;
	showRightButtonInHeader!: boolean;
	headerText!: string;

	onLeftButtonClickInHeader() {
		this.router.navigateByUrl('/survey/list');
	}

	onRightButtonClickInHeader() {
		this.router.navigate(['/question/add', this.surveyId]);
	}

	constructor(

		private serviceSurveyList: LocalStorageService,
		private router: Router,
		private route: ActivatedRoute,
		private alertBoxService: AlertBoxService,
	) {
		this.surveyId = this.route.snapshot.paramMap.get('id')!;
	}

	ngOnInit() {
		this.serviceSurveyList.getSurveyById(this.surveyId)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (response) => {
					this.headerText = response.title;
					if (response.status != 1) {
						this.showButton = true
					} else {
						this.showButton = false
					}
					this.surveyInfo = response;
					response.questions.forEach(question => {
						var questions = new Question(question);
						this.questionInfo.push(questions);
					});

					if (this.surveyInfo.status == 0) {
						this.headerRightButtonText = 'Nieuwe vraag';
						this.showRightButtonInHeader = true;
					} else {
						this.showRightButtonInHeader = false;
					}
				}
			});
	}

	async removeQuestion(id: number, index: number) {
		this.alertBoxService.newAlert(
			'Vraag verwijderen!',
			'Weet u zeker dat u deze vraag wilt verwijderen?',
			this.skipAlert
		);
		if (
			(await firstValueFrom(this.alertBoxService.confirmation$)) ===
			'confirmAlert'
		) {
			this.serviceSurveyList.RemoveQuestion(id)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (response) => {

						this.questionInfo.splice(index, 1);

					}
				});
		}

	}

	async removeSurvey() {
		this.alertBoxService.newAlert('Survey verwijderen!', 'Weet u zeker dat u deze survey wilt verwijderen?', this.skipAlert);
		if (await firstValueFrom(this.alertBoxService.confirmation$) === 'confirmAlert') {
			this.serviceSurveyList.removeSurvey(this.surveyId)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (next) => {
						this.router.navigateByUrl('/survey/list');
					}
				});

		}
	}

	copyToClipboard(link: string) {
		var dummy = document.createElement('input'),

			//een custom link maken
			link = window.location.host + "/survey/" + this.surveyId;

		document.body.appendChild(dummy);
		dummy.value = link;
		dummy.focus();
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		this.copied = true

		setTimeout(() => {
			this.copied = false;
		}, 2000);

		return this.copied;
	}

	addQuestionToggle() {
		this.questions = !this.questions;
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
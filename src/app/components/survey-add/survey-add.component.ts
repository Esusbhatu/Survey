import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/local-storage-service/local-storage.service';
import { Survey } from 'src/app/classes/survey.class';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-survey',
	templateUrl: './survey-add.component.html',
	styleUrls: ['./survey-add.component.scss'],
})
export class SurveyAddComponent implements OnInit, OnDestroy {
	formGroup!: FormGroup;
	private formSubmitAttempt: boolean = false;
	public isEditMode: boolean = false;
	public peramId!: string;
	public surveyInfo!: any;
	unsubscribe$ = new Subject<void>();

	headerLeftButtonText!: string;
	headerRightButtonText!: string;
	headerText!: string;

	today = new Date();
	tomorrow?: any;
	firstDate?: string;
	secondDate?: string;
	minSecondDate?: string;

	constructor(
		private formbuilder: FormBuilder,
		private localStorageService: LocalStorageService,
		private router: Router,
		private route: ActivatedRoute,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		if (this.peramId = this.route.snapshot.params['id']) {
			this.isEditMode = true;
			this.surveyInfo = this.localStorageService.getSurveyById(this.peramId);
		}

		if (!this.isEditMode) {
			this.tomorrow = new Date();
			this.tomorrow.setDate(this.tomorrow.getDate() + 1);
			this.tomorrow = this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd');
		} else {
			this.tomorrow = new Date();
			this.tomorrow.setDate(this.tomorrow.getDate());
			this.tomorrow = this.datePipe.transform(this.tomorrow, 'yyyy-MM-dd');
		}

		if (this.isEditMode) {
			this.headerLeftButtonText = 'Annuleren';
			this.headerText = 'Bewerken';
			this.headerRightButtonText = 'Update';

			this.localStorageService.getSurveyById(this.peramId)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (response: Survey) => {
						const endOnlyDate = response.endDate.toString().substring(0, 10);
						const startOnlyDate = response.startDate?.toString().substring(0, 10);
						this.formGroup = new FormGroup({
							title: new FormControl(response.title, [Validators.required, Validators.minLength(3)]),
							description: new FormControl(response.description, []),
							startDate: new FormControl(startOnlyDate, [Validators.required]),
							endDate: new FormControl(endOnlyDate, [Validators.required])
						});
					}
				});
		}

		if (!this.isEditMode) {
			this.headerLeftButtonText = 'Enquêtes';
			this.headerText = 'Aanmaken';
			this.headerRightButtonText = 'Opslaan';

			this.formGroup = this.formbuilder.group({
				title: [null, [Validators.required, Validators.minLength(3)]],
				description: [null, []],
				owner: [null, [Validators.required]],
				startDate: [null, [Validators.required]],
				endDate: [null, [Validators.required]]
			});
		}

	}

	onLeftButtonClickInHeader() {
		if (!this.isEditMode) {
			this.router.navigateByUrl('/survey/list');
		} else {
			this.router.navigate(['/survey/edit', this.peramId]);
		}
	}

	onRightButtonClickInHeader() {
		if (!this.isEditMode) {
			this.addSurvey();
		} else {
			this.updateSurvey();
		}
	}

	setDates(date: string, inputType: string) {
		if (inputType === 'firstDate') {
			this.firstDate = date;
			this.minSecondDate = date;
		} else {
			if (new Date(date) >= new Date(this.firstDate!)) {
				this.secondDate = date;
			}
		}
	}

	onSubmit() {
	}

	addSurvey() {
		if (this.formGroup.valid) {
			const survey = new Survey(this.formGroup.value);
			this.localStorageService.addSurvey(survey)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (next) => {
						this.router.navigateByUrl('/survey/list');
					}
				});
		}
	}

	updateSurvey() {
		if (this.formGroup.valid) {
			this.localStorageService.updateSurvey(this.peramId, this.formGroup.value)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (response) => {
						this.router.navigate(['/survey/edit', this.peramId]);
					}
				});
		}
	}

	isFieldNotValid(field: string) {
		const x = this.formGroup.get(field)!
		return (x.invalid && x.touched || x.invalid && this.formSubmitAttempt && !x.value)
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType, typeValue } from 'src/app/classes/question-type.enum';
import { LocalStorageService } from 'src/app/service/local-storage-service/local-storage.service';
import { Question } from 'src/app/classes/question.class';
import { Survey } from 'src/app/classes/survey.class';
import { Subject, takeUntil } from 'rxjs';
import { Choices } from 'src/app/classes/choices';


@Component({
	selector: 'app-question-add',
	templateUrl: './question-add.component.html',
	styleUrls: ['./question-add.component.scss'],
})

export class QuestionAddComponent implements OnInit, OnDestroy {
	formGroup!: FormGroup;
	public surveyId!: string;
	public questionId?: number;
	public surveyInfo!: Survey;
	public questionInfo?: Question;
	public questionType?: QuestionType;
	public QuestionTypes = typeValue;
	public isEditMode: boolean = false;
	public formSubmitAttempt: boolean = false;
	unsubscribe$ = new Subject<void>();

	headerLeftButtonText!: string;
	headerRightButtonText!: string;
	headerText!: string;

	constructor(
		private formbuilder: FormBuilder,
		private route: ActivatedRoute,
		private localStorageService: LocalStorageService,
		private router: Router,
	) {
		this.surveyId = this.route.snapshot.paramMap.get('id')!;

		if (this.route.snapshot.paramMap.get('quid')) {
			this.isEditMode = true;
			this.questionId = Number.parseInt(this.route.snapshot.paramMap.get('quid')!);
		}
	}

	changeType(event: any) {
		this.questionType = event.target.value;
	}

	ngOnInit(): void {
		this.formGroup = this.formbuilder.group({
			questionText: ['', [Validators.required]],
			questionType: ['', [Validators.required]],
			required: [true, [Validators.required]],
			choices: this.formbuilder.array([]),
		});

		this.getSurveyById(this.surveyId);

		this.headerLeftButtonText = this.isEditMode ? 'Annuleren' : 'Terug';
		this.headerText = this.isEditMode ? 'Vraag Wijzigen' : 'Nieuwe vraag';
		this.headerRightButtonText = this.isEditMode ? 'Update' : 'Opslaan';
	}

	getSurveyById(id: string) {
		this.localStorageService.getSurveyById(this.surveyId)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((data: Survey) => {
				this.surveyInfo = new Survey(data);
				this.surveyInfo.questions = this.surveyInfo.questions.map(question => {
					question.choices = question.choices.map(choice => { return new Choices(choice) })
					return new Question(question);
				});
				if (this.isEditMode) {
					this.prepareEditMode();
				}
			});
	}

	private prepareEditMode() {
		this.questionInfo = this.surveyInfo!.questions.find(x => x.getId == this.questionId);
		this.questionType = this.questionInfo!.questionType;

		(this.formGroup.get('questionText') as FormControl).setValue(this.questionInfo!.questionText);
		(this.formGroup.get('questionType') as FormControl).setValue(this.questionInfo!.questionType);
		(this.formGroup.get('required') as FormControl).setValue(this.questionInfo!.required);

		this.questionInfo!.choices.forEach(item => {
			(this.formGroup.get('choices') as FormArray).controls
				.push(
					this.formbuilder.control({ value: item.choice, disabled: true }, { validators: [], updateOn: 'blur' })
				);
		});
	}

	onLeftButtonClickInHeader() {
		if (!this.isEditMode) {
			this.router.navigate(['/survey/edit', this.surveyId]);
		} else {
			this.router.navigate(['/survey/edit', this.surveyId]);
		}
	}

	onRightButtonClickInHeader() {
		if (!this.isEditMode) {
			this.saveQuestion();
		} else {
			this.updateQuestion();
		}
	}

	onSubmit() {
	}

	saveQuestion() {
		if (this.formGroup.valid) {
			if (!this.questionId) {
				var data = this.formGroup.getRawValue();
				data.choices = data.choices.filter(Boolean);
				data.choices = data.choices.map(
					(choice: string, i: number): Choices => (
						new Choices({
							index: i,
							choice: choice,
						})
					));

				const question: Question = new Question(data);
				question.questionType = Number(question.questionType);
				question.index = this.surveyInfo!.questions.length;

				this.localStorageService.AddQuestion(this.surveyId, question)
					.pipe(takeUntil(this.unsubscribe$))
					.subscribe({
						next: (data) => {
							this.router.navigate([
								'/survey/edit',
								this.surveyId,
							]);
						},
					});
			}
		}
	}

	updateQuestion() {
		if (this.formGroup.valid) {
			let data = this.formGroup.getRawValue();
			data.choices = data.choices.filter(Boolean);

			data.choices = data.choices.map(
				(choice: string, i: number): Choices => (
					new Choices({
						index: i,
						choice: choice,
					})
				));

			this.questionInfo!.questionText = data.questionText;
			this.questionInfo!.questionType = data.questionType;
			this.questionInfo!.required = data.required;
			this.questionInfo!.index = data.questionIndex;
			this.questionInfo!.choices = data.choices;

			this.localStorageService.updateQuestion(this.questionId!, this.questionInfo!)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe({
					next: (data) => {
						this.router.navigate(['survey/edit', this.surveyId]);
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
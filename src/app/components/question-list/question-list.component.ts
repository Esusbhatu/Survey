import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage-service/local-storage.service';
import { Router } from '@angular/router';
import { Survey } from 'src/app/classes/survey.class';
import { Question } from 'src/app/classes/question.class';
import { Subject, takeUntil } from 'rxjs';
import { QuestionType } from 'src/app/classes/question-type.enum';
import { Choices } from 'src/app/classes/choices';
import { Answer } from 'src/app/classes/answer.class';
import { AlertBoxService } from 'src/app/service/alert-box-service/alert-box.service';

@Component({
	selector: 'app-form',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.scss'],
})

export class QuestionListComponent implements OnInit, OnDestroy {
	public surveyId!: string;
	public surveyInfo!: Survey;
	public questionIndex: number = 0;
	public questionList: Question[] = [];
	public started: boolean = false;
	public finished: boolean = false;
	public formGroup!: FormGroup;
	unsubscribe$ = new Subject<void>();
	public questionType = QuestionType;

	constructor(
		private serviceQuestionList: LocalStorageService,
		private route: ActivatedRoute,
		private formbuilder: FormBuilder,
		private router: Router,
		private alertBox: AlertBoxService,
	) {
		this.surveyId = this.route.snapshot.paramMap.get('id')!;
	}

	@ViewChild('formElement') formElement: any;

	ngOnInit(): void {
		this.formGroup = this.formbuilder.group({});

		this.serviceQuestionList.getSurveyById(this.surveyId)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (response: Survey) => {
					this.surveyInfo = new Survey(response);

					this.surveyInfo.questions = response.questions.map(question => {
						question.choices = question.choices.map(choice => { return new Choices(choice) })
						let tmpQuestion = new Question(question);
						this.questionList?.push(tmpQuestion);
						return tmpQuestion;
					});

					for (let i = 0; i < this.questionList.length; i++) {
						let question: Question = this.questionList[i];
						if (question.questionType == QuestionType.open || question.questionType == QuestionType.scale || question.questionType == QuestionType.multipleChoiceOne) {
							if (question.required) {
								this.formGroup.addControl(this.questionList[i].getId.toString(), new FormControl('', [Validators.required]));
							} else {
								this.formGroup.addControl(this.questionList[i].getId.toString(), new FormControl('', []));
							}
						}
						if (question.questionType == QuestionType.multipleChoiceMore) {
							if (question.required) {
								this.formGroup.addControl(this.questionList[i].getId.toString(), new FormArray([], [Validators.required]));
							} else {
								this.formGroup.addControl(this.questionList[i].getId.toString(), new FormArray([]));
							}
						}
					}
					this.formGroup.controls[this.questionList[this.questionIndex].getId].markAsTouched();
				}
			});

		this.formGroup.valueChanges.subscribe(val => {
			localStorage.setItem(this.surveyId, JSON.stringify(this.answers));
		});
	}

	startSurvey() {
		this.router.navigate(['/survey', this.surveyId, this.questionIndex + 1]);
		this.started = true;
	}

	nextQuestion() {
		if (this.questionIndex < this.questionList.length - 1) {
			this.questionIndex++;
			this.formGroup.controls[this.questionList[this.questionIndex].getId].markAsTouched();
			this.router.navigate(['/survey', this.surveyId, this.questionIndex + 1]);
		} else {
			if (this.formGroup.invalid) {
				this.alertBox.newAlert('something went wrong', 'Please check your answers and try again');
			} else {
				this.submitForm();
			}
		}
	}

	get controls() {
		return Object.values(this.formGroup.controls);
	}

	get currentControl() {
		return Object.values(this.formGroup.controls)[this.questionIndex];
	}

	prevQuestion() {
		if (this.questionIndex > 0) {
			this.questionIndex--;
			this.formGroup.controls[this.questionList[this.questionIndex].getId].markAsTouched();
			this.router.navigate(['/survey', this.surveyId, this.questionIndex + 1]);
		}
	}

	onCheckboxChange(event: any, index: number) {
		const selectedItems = (this.formGroup.controls[index] as FormArray);
		if (event.target.checked) {
			selectedItems.push(new FormControl(event.target.value));
		} else {
			const index = selectedItems.controls
				.findIndex(x => x.value === event.target.value);
			selectedItems.removeAt(index);
		}
	}

	get answers() {
		let answers: any = { "answers": [] };

		Object.entries(this.formGroup.value).forEach(data => {
			const [key, value]: [string, any] = data;
			if (Array.isArray(value)) {
				value.forEach((element: string) => {
					answers['answers'].push(new Answer({ 'questionId': parseInt(key), 'answer': element }));
				});
			} else {
				answers['answers'].push(new Answer({ 'questionId': parseInt(key), 'answer': value }));
			}
		});
		return answers;
	}

	submitForm() {
		this.serviceQuestionList.AddAnswers(this.surveyId, this.answers)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: async (data) => {
					this.finished = true;
					await new Promise(resolve => setTimeout(resolve, 5000));
					this.router.navigate(['/survey/list']);
				},
				error: (error) => {
					this.alertBox.newAlert('Error', 'Something went wrong while saving your answers. Please try again later.');
				}
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
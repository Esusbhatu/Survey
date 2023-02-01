import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/classes/question-type.enum';

@Component({
	selector: 'app-question-input',
	templateUrl: './question-input.component.html',
	styleUrls: ['./question-input.component.scss']
})
export class QuestionInputComponent implements OnInit, OnChanges {
	@Input() questionId?: number;
	@Input() questionType!: QuestionType;
	@ViewChild('inputContainer') inputContainer?: ElementRef;
	public isEditing: boolean = false;
	public form!: FormGroup

	constructor(private formbuilder: FormBuilder,
		private FGD: FormGroupDirective
	) {
		this.form = this.FGD.control.get('choices') as FormGroup;
		
	}

	get answers() {
		
		return this.FGD.control.get('choices') as FormArray;
	}

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.questionId) {
			this.answers.controls.splice(0, this.answers.controls.length);
		}
		setTimeout(() => {
			switch (this.questionType.toString()) {
				case '1':
					this.createItem();
					break;
				case '2':
					this.createItem();
					break;
				case '3':
					this.createItem();
					break;
				case '4':
					this.createItem();
					break;
			}
		})
	}

	private createItem(index?: number) {
		if (index != null) { this.answers.controls[index].disable() }
		this.answers.push(this.formbuilder.control({ value: '', disabled: false }, { validators: [], updateOn: 'change' })); 
		setTimeout(() => { this.giveFocus(this.answers.controls.length - 1) });
	}

	public deleteItem(index: number) {
		this.answers.removeAt(index);
	}

	public saveItem(index: number) {
		if (this.answers.controls[index].valid && this.answers.controls[index].value) {
			this.isEditing = false;
			this.createItem(index);
		}
	}

	public editItem(index: number) {
		this.isEditing = true;
		this.answers.controls.pop();
		this.answers.controls[index].enable();
		this.giveFocus(index);
	}

	public giveFocus(index: number) {
		this.inputContainer?.nativeElement.children[index].children[0].getElementsByTagName('input').item(0).focus();
	}
}
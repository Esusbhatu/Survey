import { QuestionType } from './question-type.enum';

export class QuestionBase {
	private _id: number;
	public index!: number;
	public required!: boolean;
	public questionText!: string;
	public questionType!: QuestionType;

	constructor(data: any) {
		this._id = data.id;
		this.index = data.index;
		this.required = data.required;
		this.questionText = data.questionText;
		this.questionType = data.questionType;
	}

	get getId() {
		return this._id;
	}
}
import { Question } from './question.class';
import { status } from './status.enum';

export class Survey {
	private _id!: string;
	public title!: string;
	public description?: string;
	public questions!: Question[];
	public owner?: string;
	public status!: status;
	public startDate!: Date;
	public endDate!: Date;

	constructor(data: any) {
		this._id = data.publicIdentifier;
		this.title = data.title;
		this.description = data.description;
		this.questions = data.questions || [];
		this.owner = data.owner;
		this.status = data.status;
		this.startDate = data.startDate;
		this.endDate = data.endDate;
	}

	public addQuestion(question: Question) {
		this.questions.push(question);
	}

	get getId() {
		return this._id;
	}
}

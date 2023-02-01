export class Answer {
	private questionId: any;
	private answer: any;

	constructor(data: any) {
		this.questionId = data.questionId;
		this.answer = data.answer;
	}
}
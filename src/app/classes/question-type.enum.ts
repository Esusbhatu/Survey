export enum QuestionType {
	open = 0,
	scale = 1,
	multipleChoiceOne = 2,
	multipleChoiceMore = 3
}

export const typeValue = [
	{ value: QuestionType.open, typeName: 'Open vraag', typeValue: 0 },
	{ value: QuestionType.scale, typeName: 'Helemaal eens/Helemaal oneens', typeValue: 1 },
	{ value: QuestionType.multipleChoiceOne, typeName: 'Multiple choice (een)', typeValue: 2 },
	{ value: QuestionType.multipleChoiceMore, typeName: 'Multiple choice (meerdere)', typeValue: 3 },
];
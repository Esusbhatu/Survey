import { Choices } from "./choices";
import { QuestionBase } from "./question-base.class";
 
 export type ScaleChoice = {
    index : number;
    text: string
}
export class Question extends QuestionBase {
    public choices: Choices[];
    public scale: ScaleChoice[]; 
    
    constructor(data: any) {
        super(data)
        this.choices = data.choices;
        this.scale = data.scale;
    }
}
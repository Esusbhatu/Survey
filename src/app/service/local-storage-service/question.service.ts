import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ScaleChoice } from 'src/app/classes/question.class';


@Injectable({
    providedIn: 'root',
})
export class QuestionService {
    private passQuestionDataSubject$ = new Subject<string[] >();
    public questionData$ = this.passQuestionDataSubject$.asObservable();
    
    private passQuestionRating$ = new Subject<ScaleChoice[]>()
    public qustioRating$ = this.passQuestionRating$.asObservable();

    public rating!: ScaleChoice[]

    public passQuestionData(questionData: string[]) {
        this.passQuestionDataSubject$.next(questionData);
    }
    
    public passQuestionRating(questionData:ScaleChoice[]){
       this.passQuestionRating$.next(questionData)
    }

  
}
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Question } from '../../classes/question.class';
import { Survey } from '../../classes/survey.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {

	baseApiUrl: string = 'https://localhost:7177';
	mockData: boolean = false;
	private mockSurvey: any[] = [
		{
			"publicIdentifier": "3521d9c8-0e95-4bd1-a944-23353fe18284",
			"title": "MockData: Sample Survey",
			"description": "MockData: This is a sample survey to demonstrate the structure of survey data.",
			"questions": [
				{
					"id": 1,
					"index": 0,
					"required": true,
					"questionText": "What is your favorite color?",
					"questionType": 0,
					"choices": []
				},
				{
					"id": 2,
					"index": 0,
					"required": true,
					"questionText": "Which of the following sports do you enjoy watching?",
					"questionType": 1,
					"choices": [
						{
							"id": 1,
							"index": 0,
							"choice": "Football"
						},
						{
							"id": 2,
							"index": 1,
							"choice": "Badminton"
						},
						{
							"id": 3,
							"index": 2,
							"choice": "Field Hockey"
						},
						{
							"id": 4,
							"index": 3,
							"choice": "Volleyball"
						},
						{
							"id": 5,
							"index": 4,
							"choice": "Basketball"
						},

					]
				},
				{
					"id": 3,
					"index": 0,
					"required": false,
					"questionText": "Do you believe most news articles are true?",
					"questionType": 2,
					"choices": [
						{
							"id": 2,
							"index": 0,
							"choice": "Item 1"
						},
						{
							"id": 3,
							"index": 1,
							"choice": "Item 2"
						},
						{
							"id": 4,
							"index": 2,
							"choice": "Item 3"
						},
						{
							"id": 5,
							"index": 3,
							"choice": "Item 4"
						}
					]
				},
				{
					"id": 4,
					"index": 0,
					"required": false,
					"questionText": "If you see someone someone sharing fake news stories, what do you do?",
					"questionType": 3,
					"choices": [
						{
							"id": 2,
							"index": 0,
							"choice": "Choice 1"
						},
						{
							"id": 3,
							"index": 1,
							"choice": "Choice 2"
						},
						{
							"id": 4,
							"index": 2,
							"choice": "Choice 3"
						},
						{
							"id": 5,
							"index": 3,
							"choice": "Choice 4"
						},
						{
							"id": 6,
							"index": 4,
							"choice": "Choice 5"
						}
					]
				},
				{
					"id": 19,
					"index": 0,
					"required": true,
					"questionText": "If you see someone someone sharing fake news stories, what do you do?",
					"questionType": 3,
					"choices": [
						{
							"id": 2,
							"index": 0,
							"choice": "Choice 1"
						},
						{
							"id": 3,
							"index": 1,
							"choice": "Choice 2"
						},
						{
							"id": 4,
							"index": 2,
							"choice": "Choice 3"
						},
						{
							"id": 5,
							"index": 3,
							"choice": "Choice 4"
						},
						{
							"id": 6,
							"index": 4,
							"choice": "Choice 5"
						}
					]
				}
			],
			"owner": "John Doe",
			"status": 1,
			"startDate": "2022-01-01T00:00:00",
			"endDate": "2023-12-31T00:00:00"
		},
		{
			"publicIdentifier": "e7c24010-4014-4a5c-9796-f75e53d41e29",
			"title": "MockData: Employee Satisfaction Survey",
			"description": "MockData: This survey is designed to gather feedback from employees about their experiences and satisfaction with the company.",
			"questions": [
				{
					"id": 4,
					"index": 0,
					"required": true,
					"questionText": "How satisfied are you with your job?",
					"questionType": 1,
					"choices": []
				},
				{
					"id": 5,
					"index": 0,
					"required": true,
					"questionText": "How likely are you to recommend this company as a good place to work?",
					"questionType": 2,
					"choices": []
				},
				{
					"id": 6,
					"index": 0,
					"required": false,
					"questionText": "Please provide any additional comments or feedback.",
					"questionType": 3,
					"choices": []
				}
			],
			"owner": "Jane Smith",
			"status": 2,
			"startDate": "2022-02-01T00:00:00",
			"endDate": "2022-02-28T00:00:00"
		},
		{
			"publicIdentifier": "6087ada9-ae3a-483f-85f0-bda6b2817cae",
			"title": "MockData: Event Feedback Survey",
			"description": "MockData: This survey is designed to gather feedback from attendees about their experiences at our recent event.",
			"questions": [
				{
					"id": 7,
					"index": 0,
					"required": true,
					"questionText": "Overall, how satisfied were you with the event?",
					"questionType": 1,
					"choices": []
				},
				{
					"id": 8,
					"index": 0,
					"required": true,
					"questionText": "Which of the following best describes your experience at the event?",
					"questionType": 2,
					"choices": []
				},
				{
					"id": 9,
					"index": 0,
					"required": false,
					"questionText": "Please provide any additional comments or feedback.",
					"questionType": 3,
					"choices": []
				}
			],
			"owner": "Event Planning Team",
			"status": 0,
			"startDate": "2023-12-31T00:00:00",
			"endDate": "2023-12-31T00:00:00"
		},
		{
			"publicIdentifier": "5bce8bab-a384-4ae5-99f1-68da1f29bebe",
			"title": "MockData: Product Feedback Survey",
			"description": "MockData: This survey is designed to gather feedback from customers about a recent product purchase.",
			"questions": [
				{
					"id": 10,
					"index": 0,
					"required": true,
					"questionText": "How satisfied are you with your purchase?",
					"questionType": 2,
					"choices": []
				},
				{
					"id": 11,
					"index": 0,
					"required": true,
					"questionText": "Would you purchase this product again?",
					"questionType": 1,
					"choices": []
				},
				{
					"id": 12,
					"index": 0,
					"required": false,
					"questionText": "Please provide any additional comments or feedback.",
					"questionType": 3,
					"choices": []
				}
			],
			"owner": "Acme Corp",
			"status": 1,
			"startDate": "2022-09-01T00:00:00",
			"endDate": "2023-04-30T00:00:00"
		},
		{
			"publicIdentifier": "9394f46c-f11c-4d3d-a950-ed071d53c4ef",
			"title": "MockData: Restaurant Feedback Survey",
			"description": "MockData: This survey is designed to gather feedback from customers about their dining experiences at our restaurant.",
			"questions": [
				{
					"id": 13,
					"index": 0,
					"required": true,
					"questionText": "Overall, how satisfied were you with your dining experience?",
					"questionType": 1,
					"choices": []
				},
				{
					"id": 14,
					"index": 0,
					"required": true,
					"questionText": "How likely are you to dine with us again?",
					"questionType": 2,
					"choices": []
				},
				{
					"id": 15,
					"index": 0,
					"required": false,
					"questionText": "Please provide any additional comments or feedback.",
					"questionType": 3,
					"choices": []
				}
			],
			"owner": "Admin",
			"status": 0,
			"startDate": "2023-04-01T00:00:00",
			"endDate": "2023-04-30T00:00:00"
		}
	]

	constructor(public http: HttpClient) { }

	public getSurveys(): Observable<Survey[]> {
		if (this.mockData) {
			return this.http.get<Survey[]>(this.baseApiUrl + '/api/Survey');
		} else {
			return of(this.mockSurvey);
		}
	}

	public getSurveyById(id: string): Observable<Survey> {
		if (this.mockData) {
			return this.http.get<Survey>(this.baseApiUrl + '/api/Survey/' + id);
		} else {
			var i = this.mockSurvey.findIndex(x => x.publicIdentifier === id);
			return of(this.mockSurvey[i]);
		}
	}


	public addSurvey(survey: Survey): Observable<Survey> {
		if (this.mockData) {
			const httpOptions = {
				headers: new HttpHeaders({ 'Content-Type': 'application/json' })
			}
			return this.http.post<Survey>(this.baseApiUrl + '/api/Survey', survey, httpOptions);
		} else {

			return of(survey);
		}
	}

	public updateSurvey(id: string, survey: Survey): Observable<Survey> {
		if (this.mockData) {
			const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

			return this.http.put<Survey>(this.baseApiUrl + '/api/Survey/' + id, survey, httpOptions);
		} else {
			var i = this.mockSurvey.findIndex(x => x.publicIdentifier === id);
			return of(this.mockSurvey[i]);
		}
	}

	public filterSurvey(id: number, searchTerm: string): Observable<Survey[]> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}
		return this.http.get<Survey[]>(this.baseApiUrl + '/api/Survey/search/' + id + "/" + searchTerm, httpOptions);
	}

	public removeSurvey(id: string): Observable<Survey> {
		if (this.mockData) {
			return this.http.delete<Survey>(this.baseApiUrl + '/api/Survey/' + id);
		} else {

			var i = this.mockSurvey.findIndex(x => x.publicIdentifier === id);
			return of(this.mockSurvey[i]);
		}
	}

	public getQuestionById(id: number): Observable<Question> {

		return this.http.get<Question>(this.baseApiUrl + '/api/Question/' + id);
	}



	public AddQuestion(id: string, question: Question): Observable<Question> {

		return this.http.post<Question>(this.baseApiUrl + '/api/Question/' + id, question);
	}

	public updateQuestion(id: number, question: Question): Observable<Question> {

		return this.http.put<Question>(this.baseApiUrl + '/api/Question/' + id, question);
	}

	public RemoveQuestion(id: number): Observable<Question> {

		return this.http.delete<Question>(this.baseApiUrl + '/api/Question/' + id);

	}


	public AddAnswers(id: string, answersArray: any): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}
		return this.http.post<any>(this.baseApiUrl + '/api/Answer/' + id, answersArray, httpOptions);
	}
}
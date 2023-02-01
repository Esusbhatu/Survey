import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { SurveyQuestionComponent } from './components/survey-question/survey-question.component';
import { SurveyAddComponent } from './components/survey-add/survey-add.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PreviewAnswerComponent } from './components/preview-answer/preview-answer.component';

const routes: Routes = [
	{ path: 'home', title: "InCompany", component: HomePageComponent },
	{ path: 'survey/answers', component: PreviewAnswerComponent },
	{ path: 'survey/list', title: "Survey list", component: SurveyListComponent },
	{ path: 'survey/create', component: SurveyAddComponent },
	{ path: 'survey/edit/:id', component: SurveyQuestionComponent },
	{ path: 'survey/edit/details/:id', component: SurveyAddComponent },
	{ path: 'question/add/:id', component: QuestionAddComponent },
	{ path: 'question/edit/:id/:quid', component: QuestionAddComponent },
	{ path: 'survey/:id/:quid', component: QuestionListComponent },
	{ path: 'survey/:id', redirectTo: 'survey/:id/start', pathMatch: 'full' },
	{ path: '**', redirectTo: '/home' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }

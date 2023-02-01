import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SurveyListComponent } from './components/survey-list/survey-list.component';
import { SurveyQuestionComponent } from './components/survey-question/survey-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyAddComponent } from './components/survey-add/survey-add.component';
import { QuestionInputComponent } from './components/question-input/question-input.component';
import { QuestionAddComponent } from './components/question-add/question-add.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DatePipe } from '@angular/common';
import { PreviewAnswerComponent } from './components/preview-answer/preview-answer.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
	declarations: [
		AppComponent,
		SurveyListComponent,
		FooterComponent,
		LogoComponent,
		HeaderComponent,
		QuestionListComponent,
		SurveyQuestionComponent,
		SurveyAddComponent,
		QuestionInputComponent,
		QuestionAddComponent,
		AlertBoxComponent,
		HomePageComponent,
		PreviewAnswerComponent
	],
	providers: [
		AlertBoxComponent,
		SurveyQuestionComponent,
		DatePipe
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: !isDevMode(),
    // Register the ServiceWorker as soon as the application is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  })
	],
	bootstrap: [AppComponent],
})

export class AppModule { }
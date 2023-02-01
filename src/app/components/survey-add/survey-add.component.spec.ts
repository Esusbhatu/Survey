import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAddComponent } from './survey-add.component';

describe('SurveyComponent', () => {
  let component: SurveyAddComponent;
  let fixture: ComponentFixture<SurveyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

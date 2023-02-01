import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAnswerComponent } from './preview-answer.component';

describe('PreviewAnswerComponent', () => {
  let component: PreviewAnswerComponent;
  let fixture: ComponentFixture<PreviewAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

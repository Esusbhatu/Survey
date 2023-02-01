import { ComponentFixture, TestBed } from '@angular/core/testing';

import { questionInputComponent } from './question-input.component';

describe('questionInputComponent', () => {
  let component: questionInputComponent;
  let fixture: ComponentFixture<questionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ questionInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(questionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

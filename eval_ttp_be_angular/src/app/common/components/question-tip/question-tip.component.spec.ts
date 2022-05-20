import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTipComponent } from './question-tip.component';

describe('QuestionTipComponent', () => {
  let component: QuestionTipComponent;
  let fixture: ComponentFixture<QuestionTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

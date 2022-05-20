import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerTipComponent } from './answer-tip.component';

describe('AnswerTipComponent', () => {
  let component: AnswerTipComponent;
  let fixture: ComponentFixture<AnswerTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

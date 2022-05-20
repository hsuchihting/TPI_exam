import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesupModalComponent } from './timesup-modal.component';

describe('TimesupModalComponent', () => {
  let component: TimesupModalComponent;
  let fixture: ComponentFixture<TimesupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

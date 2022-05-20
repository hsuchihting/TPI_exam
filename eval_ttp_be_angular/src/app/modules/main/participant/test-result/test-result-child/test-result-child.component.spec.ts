import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultChildComponent } from './test-result-child.component';

describe('TestResultChildComponent', () => {
  let component: TestResultChildComponent;
  let fixture: ComponentFixture<TestResultChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

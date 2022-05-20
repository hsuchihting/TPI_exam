import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestsGroupComponent } from './viewTestsGroup.component';

describe('ViewTestsGroupComponent', () => {
  let component: ViewTestsGroupComponent;
  let fixture: ComponentFixture<ViewTestsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

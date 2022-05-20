import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmploymentComponent } from './addEditEmployment.component';

describe('AddEmploymentComponent', () => {
  let component: AddEditEmploymentComponent;
  let fixture: ComponentFixture<AddEditEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

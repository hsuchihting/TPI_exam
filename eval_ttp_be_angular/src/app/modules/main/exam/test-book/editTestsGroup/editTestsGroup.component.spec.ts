import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestsGroupComponent } from './editTestsGroup.component';

describe('EditTestsGroupComponent', () => {
  let component: EditTestsGroupComponent;
  let fixture: ComponentFixture<EditTestsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

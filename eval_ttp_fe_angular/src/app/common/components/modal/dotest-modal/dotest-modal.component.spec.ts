import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotestModalComponent } from './dotest-modal.component';

describe('DotestModalComponent', () => {
  let component: DotestModalComponent;
  let fixture: ComponentFixture<DotestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompletedModalComponent } from './uncompleted-modal.component';

describe('UncompletedModalComponent', () => {
  let component: UncompletedModalComponent;
  let fixture: ComponentFixture<UncompletedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncompletedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncompletedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

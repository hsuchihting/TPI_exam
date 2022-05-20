import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HurryupModalComponent } from './hurryup-modal.component';

describe('HurryupModalComponent', () => {
  let component: HurryupModalComponent;
  let fixture: ComponentFixture<HurryupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HurryupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HurryupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

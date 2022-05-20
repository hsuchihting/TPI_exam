import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendParticipantComponent } from './send-participant.component';

describe('SendParticipantComponent', () => {
  let component: SendParticipantComponent;
  let fixture: ComponentFixture<SendParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

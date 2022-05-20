import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSettingComponent } from './participant-setting.component';

describe('ParticipantSettingComponent', () => {
  let component: ParticipantSettingComponent;
  let fixture: ComponentFixture<ParticipantSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ParameterMessageService } from './parameter-message.service';

describe('ParameterMessageService', () => {
  let service: ParameterMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

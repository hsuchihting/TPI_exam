import { TestBed } from '@angular/core/testing';

import { TestBookService } from './test-book.service';

describe('TestBookService', () => {
  let service: TestBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

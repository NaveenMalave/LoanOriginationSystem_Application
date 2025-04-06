import { TestBed } from '@angular/core/testing';

import { ExistingcustomerService } from './existingcustomer.service';

describe('ExistingcustomerService', () => {
  let service: ExistingcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

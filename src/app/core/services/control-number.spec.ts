import { TestBed } from '@angular/core/testing';

import { ControlNumberService } from './control-number';

describe('ControlNumber', () => {
  let service: ControlNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

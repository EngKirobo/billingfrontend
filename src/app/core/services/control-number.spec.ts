import { TestBed } from '@angular/core/testing';

import { ControlNumber } from './control-number';

describe('ControlNumber', () => {
  let service: ControlNumber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlNumber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Kozpayment } from './kozpayment';

describe('Kozpayment', () => {
  let service: Kozpayment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kozpayment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

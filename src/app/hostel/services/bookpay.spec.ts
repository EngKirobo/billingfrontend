import { TestBed } from '@angular/core/testing';

import { Bookpay } from './bookpay';

describe('Bookpay', () => {
  let service: Bookpay;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookpay);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

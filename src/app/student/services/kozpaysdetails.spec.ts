import { TestBed } from '@angular/core/testing';

import { Kozpaysdetails } from './kozpaysdetails';

describe('Kozpaysdetails', () => {
  let service: Kozpaysdetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kozpaysdetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

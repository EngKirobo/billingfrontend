import { TestBed } from '@angular/core/testing';

import { Coursebooking } from './coursebooking';

describe('Coursebooking', () => {
  let service: Coursebooking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coursebooking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

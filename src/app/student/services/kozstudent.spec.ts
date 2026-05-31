import { TestBed } from '@angular/core/testing';

import { Kozstudent } from './kozstudent';

describe('Kozstudent', () => {
  let service: Kozstudent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kozstudent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

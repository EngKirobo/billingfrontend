import { TestBed } from '@angular/core/testing';

import { Courseintake } from './courseintake';

describe('Courseintake', () => {
  let service: Courseintake;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Courseintake);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

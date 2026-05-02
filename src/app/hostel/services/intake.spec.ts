import { TestBed } from '@angular/core/testing';

import { Intake } from './intake';

describe('Intake', () => {
  let service: Intake;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Intake);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

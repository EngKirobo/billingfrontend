import { TestBed } from '@angular/core/testing';

import { Automation } from './automation';

describe('Automation', () => {
  let service: Automation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Automation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

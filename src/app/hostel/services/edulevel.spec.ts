import { TestBed } from '@angular/core/testing';

import { Edulevel } from './edulevel';

describe('Edulevel', () => {
  let service: Edulevel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Edulevel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Gender } from './gender';

describe('Gender', () => {
  let service: Gender;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gender);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hosteldetail } from './hosteldetail';

describe('Hosteldetail', () => {
  let component: Hosteldetail;
  let fixture: ComponentFixture<Hosteldetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hosteldetail],
    }).compileComponents();

    fixture = TestBed.createComponent(Hosteldetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

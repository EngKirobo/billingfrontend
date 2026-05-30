import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coursebooking } from './coursebooking';

describe('Coursebooking', () => {
  let component: Coursebooking;
  let fixture: ComponentFixture<Coursebooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coursebooking],
    }).compileComponents();

    fixture = TestBed.createComponent(Coursebooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

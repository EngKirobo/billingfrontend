import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hostelbooking } from './hostelbooking';

describe('Hostelbooking', () => {
  let component: Hostelbooking;
  let fixture: ComponentFixture<Hostelbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hostelbooking],
    }).compileComponents();

    fixture = TestBed.createComponent(Hostelbooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

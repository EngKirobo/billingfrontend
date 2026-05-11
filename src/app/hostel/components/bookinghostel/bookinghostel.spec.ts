import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookinghostel } from './bookinghostel';

describe('Bookinghostel', () => {
  let component: Bookinghostel;
  let fixture: ComponentFixture<Bookinghostel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookinghostel],
    }).compileComponents();

    fixture = TestBed.createComponent(Bookinghostel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

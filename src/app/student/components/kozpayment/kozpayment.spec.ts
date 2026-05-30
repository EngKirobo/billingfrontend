import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kozpayment } from './kozpayment';

describe('Kozpayment', () => {
  let component: Kozpayment;
  let fixture: ComponentFixture<Kozpayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kozpayment],
    }).compileComponents();

    fixture = TestBed.createComponent(Kozpayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

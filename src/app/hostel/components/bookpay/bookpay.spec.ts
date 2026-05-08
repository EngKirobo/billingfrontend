import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookpay } from './bookpay';

describe('Bookpay', () => {
  let component: Bookpay;
  let fixture: ComponentFixture<Bookpay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookpay],
    }).compileComponents();

    fixture = TestBed.createComponent(Bookpay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Payment } from './../interfaces/hostelpayment';
import { TestBed } from '@angular/core/testing';
import { PaymentService } from './hostelpayment';



describe('Hostelpayment', () => {
  let service: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

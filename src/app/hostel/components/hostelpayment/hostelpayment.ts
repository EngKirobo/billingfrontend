import { HostelBookingService } from './../../services/hostelbooking';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../services/hostelpayment';
import { Payment,PaymentRequest } from '../../interfaces/hostelpayment';
import { CommonModule } from '@angular/common';

import { HostelBooking } from '../../interfaces/hostelbooking';

@Component({
  selector: 'app-payment',
  imports:[ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './hostelpayment.html',
  styleUrl:'./hostelpayment.css'
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];
  form!: FormGroup;

  isEditing = false;
  selectedId!: number;
  hostelbookingId!: number;
  successMessage = '';
  errorMessage = '';
  bookings: HostelBooking[] = [];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private hostelBookingService: HostelBookingService

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.load();
     this.loadBookings();
      // insert hostel bookings into payments table
    this.insertHostelBookingsIntoPayments();
  }


  loadBookings(): void {

  this.hostelBookingService.getAll()
    .subscribe({

      next: (data) => {
        this.bookings = data;
      }

    });

}

insertHostelBookingsIntoPayments(): void {

  this.hostelBookingService.getAll().subscribe({

    next: (bookings: HostelBooking[]) => {

      this.paymentService.getAll().subscribe({

        next: (payments: Payment[]) => {

          // Existing payment hostelbookingIds
          const paymentIds = payments.map(
            p => p.hostelbookingId
          );

          // ONLY booked rooms with stud_id
          // and not already in payments
          const missingBookings = bookings.filter(
            booking =>
              booking.id != null &&
              booking.studentId != null &&
              !paymentIds.includes(booking.id)
          );

          missingBookings.forEach((booking) => {

            const payment: PaymentRequest = {

              hostelbookingId: booking.id!,

              controlNumber: '',

              paymentDate: new Date().toISOString(),

              status: false

            };

            this.paymentService.create(payment)
              .subscribe({

                next: () => {

                  console.log(
                    `Inserted booking ID ${booking.id}`
                  );

                },

                error: (err) => {

                  console.error(
                    `Failed booking ID ${booking.id}`,
                    err
                  );

                }

              });

          });

          this.load();

        }

      });

    }

  });

}

getStudentIdByBooking(hostelbookingId: number): number | string {

  const booking = this.bookings.find(
    (b: any) => b.id === hostelbookingId
  );

  return booking ? booking.studentId : '';
}

  initForm() {
    this.form = this.fb.group({
      hostelbookingId: [null, Validators.required],
      controlNumber: ['', Validators.required],

    });
  }

  // ✅ LOAD
  load() {
    this.paymentService.getAll().subscribe({
      next: (data) => {this.payments = data;
                        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ SAVE
  save() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditing) {
      this.paymentService.update(this.selectedId, formValue).subscribe({
        next: () => this.afterSave('Updated successfully'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.paymentService.create(formValue).subscribe({
        next: () => this.afterSave('Created successfully'),
        error: (err) => this.handleError(err)
      });
    }
  }

  // ✅ EDIT
  edit(p: Payment) {
    this.isEditing = true;
    this.selectedId = p.id!;
    this.form.patchValue(p);
  }

  // ✅ DELETE
  delete(id: number) {
    if (confirm('Delete payment?')) {
      this.paymentService.delete(id).subscribe(() => this.load());
    }
  }

  // ✅ AFTER SAVE
  afterSave(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);

    this.form.reset({ status: false });
    this.isEditing = false;
    this.load();
  }

  // ✅ ERROR HANDLER
  handleError(err: any) {
    console.error(err);

    if (err.error?.message) {
      this.errorMessage = err.error.message;
    } else if (err.status === 401) {
      this.errorMessage = 'Unauthorized. Please login again.';
    } else {
      this.errorMessage = 'Something went wrong.';
    }
  }
 saveControlNumber(payment: any) {

  this.paymentService.update(payment.id, payment)
    .subscribe({

      next: () => {
        this.successMessage = 'Control Number saved successfully';
      },

      error: () => {
        this.errorMessage = 'Failed to save Control Number';
      }

    });

}
}

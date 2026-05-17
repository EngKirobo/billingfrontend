import { HostelBookingService } from './../../services/hostelbooking';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../services/hostelpayment';
import { Payment,PaymentRequest } from '../../interfaces/hostelpayment';
import { CommonModule } from '@angular/common';

import { HostelBooking } from '../../interfaces/hostelbooking';
import { Student } from '../../../student/interfaces/student';
import { StudentService } from '../../../student/services/student';
import { RoomService } from '../../services/room';
import { Room } from '../../interfaces/room';
import { HostelDetail } from '../../interfaces/hosteldetail';
import { HostelDetailService } from '../../services/hosteldetail';

@Component({
  selector: 'app-payment',
  imports:[ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './hostelpayment.html',
  styleUrls:['./hostelpayment.css']
})
export class PaymentComponent implements OnInit {
  hostelDetails: HostelDetail[] = [];
  payments: Payment[] = [];
  form!: FormGroup;
  rooms: Room[]=[];
  isEditing = false;
  selectedId!: number;
  hostelbookingId!: number;
  successMessage = '';
  errorMessage = '';
  bookings: HostelBooking[] = [];
  students: Student[]=[];
  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private hostelBookingService: HostelBookingService,
    private studentService:StudentService,
    private roomService: RoomService,
    private hostelDetailService: HostelDetailService

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.load();
    this.loadRooms();
    this.loadStudents();
     this.loadBookings();
      // insert hostel bookings into payments table
    this.insertHostelBookingsIntoPayments();
    this.loadHostelDetails();
  }



  loadHostelDetails(): void {

    this.hostelDetailService.getAll()
      .subscribe({

        next: (data) => {
          this.hostelDetails = data;

        }

      });

  }


  loadStudents(): void {

  this.studentService.getAll()
    .subscribe({

      next: (data) => {
        this.students = data;
      }

    });

}

  loadBookings(): void {

  this.hostelBookingService.getAll()
    .subscribe({

      next: (data) => {
        this.bookings = data;
      }

    });

}


loadRooms(): void {

  this.roomService.getAll()
    .subscribe({

      next: (data) => {
        this.rooms = data;
      }

    });

}


getHostelNameByBooking(hostelbookingId: number): string {

  // FIND BOOKING
  const booking = this.bookings.find(
    (b: any) => b.id === hostelbookingId
  );

  if (!booking) {
    return '';
  }

  // FIND ROOM
  const room = this.rooms.find(
    (r: any) => r.id === booking.roomId
  );

  if (!room) {
    return '';
  }

  // FIND HOSTEL DETAIL
  const hostelDetail = this.hostelDetails.find(
    (h: any) => h.id === room.hdetailsId
  );

  return hostelDetail ? hostelDetail.name : '';

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

// getStudentNameByBooking(hostelbookingId: number): string {

//   // find booking
//   const booking = this.bookings.find(
//     (b: any) => b.id === hostelbookingId
//   );

//   if (!booking) {
//     return '';
//   }

//   // find student using booking.studentId
//   const student = this.students.find(
//     (s: any) => s.id === booking.studentId
//   );

//   return student ? student.name : '';

// }

getStudentNameByBooking(hostelbookingId: number): { name: string; admino: string } {

  // find booking
  const booking = this.bookings.find(
    (b: any) => b.id === hostelbookingId
  );

  if (!booking) {
    return { name: '', admino: '' };
  }

  // find student using booking.studentId
  const student = this.students.find(
    (s: any) => s.id === booking.studentId
  );

  if (!student) {
    return { name: '', admino: '' };
  }

  return {
    name: student.name || '',
    admino: student.admino || ''
  };
}

// getRoomIdByBooking(hostelbookingId: number): number | string {

//   const booking = this.bookings.find(
//     (b: any) => b.id === hostelbookingId
//   );

//   return booking ? booking.roomId : '';
// }

getBookingDetails(hostelbookingId: number): any {

  return this.bookings.find(
    (b: any) => b.id === hostelbookingId
  ) || {};

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
    // if (confirm('Delete payment?')) {
    //   this.paymentService.delete(id).subscribe(() => this.load());
    // }
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
//

saveControlNumber(payment: any) {

  // CLEAR OLD MESSAGES
  this.successMessage = '';
  this.errorMessage = '';

  this.paymentService.update(payment.id, payment)
    .subscribe({

      next: () => {

        this.successMessage = 'Control Number saved successfully';
                                this.cdr.detectChanges();


        // AUTO HIDE AFTER 0.5 SECOND
        setTimeout(() => { this.successMessage = ''; this.cdr.detectChanges();}, 1000);



      },

      error: (err) => {

        this.errorMessage =
          err?.error?.message ||
          'Failed to save Control Number';
                                  this.cdr.detectChanges();


        // AUTO HIDE AFTER 0.5 SECOND
        setTimeout(() => {
          this.errorMessage = ''; this.cdr.detectChanges();
        }, 1000);


      }

    });

}
}

import { KozpaymentRequest, KozpaymentResponse } from './../../interfaces/kozpayment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { KozpaymentService } from '../../services/kozpayment';
import { CommonModule } from '@angular/common';
import { CoursebookingService } from '../../services/coursebooking';
import { CourseBookingResponseDTO } from '../../interfaces/coursebooking';

import { StudentService } from '../../services/student';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-kozpayment',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './kozpayment.html',
  styleUrl: './kozpayment.css',
})
export class KozpaymentComponent {

  searchBooking = '';

  bookingsList: CourseBookingResponseDTO[] = [];

students: Student[] = [];

kozpayments:KozpaymentResponse[]=[];
kozForm!: FormGroup;
  editingId: number | null = null;

  loading = false;

  constructor(
   private fb: FormBuilder,
   private kozpaymentService: KozpaymentService,
  private coursebookingService: CoursebookingService,
  private studentService: StudentService,
   private cdr: ChangeDetectorRef
  ){}


   ngOnInit(): void {

    this.kozForm = this.fb.group({

      coursebookingId: ['',Validators.required],
      controlNumber: ['', Validators.required],



     });

     this.loadKozpayments();
     this.loadBookingsList();
this.loadStudents();

  }

  loadBookingsList(): void {

  this.coursebookingService
    .getAllBookings()
    .subscribe({

      next: (response) => {

        this.bookingsList = response;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);
      }
    });
}

loadStudents(): void {

  this.studentService
    .getAll()
    .subscribe({

      next: (response) => {

        this.students = response;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);
      }
    });
}

filteredBookings(): CourseBookingResponseDTO[] {

  if (!this.searchBooking) {
    return [];
  }

  const search =
    this.searchBooking.toLowerCase();

  return this.bookingsList.filter(booking => {

    const student = this.students.find(
      s => s.id === booking.studId
    );

    if (!student) {
      return false;
    }

    return (
      student.name.toLowerCase().includes(search)
      ||
      student.admino.toLowerCase().includes(search)
    );

  });

}

selectBooking(
  booking: CourseBookingResponseDTO
): void {

  const student = this.students.find(
    s => s.id === booking.studId
  );

  this.kozForm.patchValue({

    coursebookingId: booking.id
  });

  this.searchBooking =
    student
      ? `${student.admino} - ${student.name}`
      : `Booking ${booking.id}`;
}

getStudentName(studId: number): string {

  const student = this.students.find(
    s => s.id === studId
  );

  return student
    ? student.name
    : '';
}

getStudentNameByBooking(coursebookingId: number): string {

  const booking = this.bookingsList.find(
    b => b.id === coursebookingId
  );

  if (!booking) {
    return '';
  }

  const student = this.students.find(
    s => s.id === booking.studId
  );

  return student ? student.name : '';
}

  loadKozpayments(): void{ this.loading = true;
    this.cdr.detectChanges();

    this.kozpaymentService
      .getAllKozpayments()
      .subscribe({

        next: (response) => {

          this.kozpayments = response;
          this.cdr.detectChanges();

          this.loading = false;
        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }

// ================= SAVE =================
  saveBooking(): void {

    if (this.kozForm.invalid) {
      return;
    }

    const payload: KozpaymentRequest = {

      coursebookingId: this.kozForm.value.coursebookingId,

      controlNumber: this.kozForm.value.controlNumber,

      paymentDate: this.kozForm.value.paymentDate,

      payerName: this.kozForm.value.payerName,

      status: this.kozForm.value.status
    };

    // UPDATE
    if (this.editingId !== null) {

      this.kozpaymentService
        .updateKozpayment(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.loadKozpayments();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });

    } else {

      // CREATE
      this.kozpaymentService
        .createKozpayment(payload)
        .subscribe({

          next: () => {

            this.loadKozpayments();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });
    }
  }



    // ================= EDIT =================
    editBooking(
      booking: KozpaymentResponse
    ): void {

      this.editingId = booking.id;

      this.kozForm.patchValue({

        coursebookingId: booking.coursebookingId,

        controlNumber: booking.controlNumber,

        paymentDate: booking.paymentDate,

        status: booking.status

      });
    }

    // ================= DELETE =================
    deleteBooking(id: number): void {

      const confirmDelete = confirm(
        'Are you sure you want to delete this booking?'
      );

      if (!confirmDelete) {
        return;
      }

      this.kozpaymentService
        .deleteKozpayment(id)
        .subscribe({

          next: () => {

            this.loadKozpayments();
          },

          error: (error) => {
            console.log(error);
          }
        });
    }

  // ================= RESET =================
  resetForm(): void {

    this.kozForm.reset({
      paymentDate: [],
      status: [false],
      payerName: []

    });

    this.editingId = null;
  }


getStudentNameByPayment(
  coursebookingId: number
): string {

  const booking = this.bookingsList.find(
    b => b.id === coursebookingId
  );

  if (!booking) {
    return '';
  }

  const student = this.students.find(
    s => s.id === booking.studId
  );

  return student
    ? student.name
    : '';
}


get latestKozpayments(): KozpaymentResponse[] {

  return [...this.kozpayments]
    .sort((a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
    )
    .slice(0, 10);
}

}

import { CourseBookingResponseDTO, CourseBookingRequestDTO } from './../../interfaces/coursebooking';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CoursebookingService } from '../../services/coursebooking';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-coursebooking',
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './coursebooking.html',
  styleUrls: ['./coursebooking.css']
})
export class CoursebookingComponent implements OnInit {

  bookings: CourseBookingResponseDTO[] = [];

  bookingForm!: FormGroup;

  editingId: number | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private coursebookingService: CoursebookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.bookingForm = this.fb.group({

      intakeId: ['', Validators.required],

      studId: ['', Validators.required],

      verified: [false],

      allowed: [false],

      ctn: [false]
    });

    this.loadBookings();

  }

  // ================= LOAD =================
  loadBookings(): void {

    this.loading = true;
    this.cdr.detectChanges();

    this.coursebookingService
      .getAllBookings()
      .subscribe({

        next: (response) => {

          this.bookings = response;
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

    if (this.bookingForm.invalid) {
      return;
    }

    const payload: CourseBookingRequestDTO = {

      intakeId: this.bookingForm.value.intakeId,

      studId: this.bookingForm.value.studId,

      verified: this.bookingForm.value.verified,

      allowed: this.bookingForm.value.allowed,

      ctn: this.bookingForm.value.ctn
    };

    // UPDATE
    if (this.editingId !== null) {

      this.coursebookingService
        .updateBooking(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.loadBookings();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });

    } else {

      // CREATE
      this.coursebookingService
        .createBooking(payload)
        .subscribe({

          next: () => {

            this.loadBookings();

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
    booking: CourseBookingResponseDTO
  ): void {

    this.editingId = booking.id;

    this.bookingForm.patchValue({

      intakeId: booking.intakeId,

      studId: booking.studId,

      verified: booking.verified,

      allowed: booking.allowed,

      ctn: booking.ctn
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

    this.coursebookingService
      .deleteBooking(id)
      .subscribe({

        next: () => {

          this.loadBookings();
        },

        error: (error) => {
          console.log(error);
        }
      });
  }

  // ================= RESET =================
  resetForm(): void {

    this.bookingForm.reset({

      verified: false,

      allowed: false,

      ctn: false
    });

    this.editingId = null;
  }
}

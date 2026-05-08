
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HostelBookingService } from '../../services/hostelbooking';
import { HostelBooking } from '../../interfaces/hostelbooking';

@Component({
   selector: 'app-hostelbooking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './hostelbooking.html',
  styleUrl: './hostelbooking.css',
})
export class HostelBookingComponent implements OnInit {

  bookings: HostelBooking[] = [];
  form!: FormGroup;
  isEditing = false;
  selectedId!: number;

  successMessage = '';

  constructor(
    private bookingService: HostelBookingService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();

    this.form = this.fb.group({
      roomId: [null, Validators.required],
      studentId: [null, Validators.required],
      academicYear: ['', Validators.required],
      semester: ['', Validators.required],
      verified: [false],
      allowed: [false]
    });
  }

  loadBookings() {
    this.bookingService.getAll().subscribe({
      next: (data) => {
        this.bookings = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  errorMessage = '';

 save() {
  // ✅ clear previous messages
  this.errorMessage = '';
  this.successMessage = '';

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.value;

  if (this.isEditing && this.selectedId) {
    // ✅ UPDATE
    this.bookingService.update(this.selectedId, formValue).subscribe({
      next: () => {
        this.afterSave('Booking updated successfully!');
      },
error: (err) => {
  console.error(err);
     this.cdr.detectChanges();
  if (err.error) {
    if (typeof err.error === 'string') {
      this.errorMessage = err.error;
    } else if (err.error.message) {
      this.errorMessage = err.error.message;
    } else {
      this.errorMessage = 'Student already booked for this semester';
    }
  } else if (err.status === 409) {
    this.errorMessage = 'Student already booked for this semester';
  } else {
    this.errorMessage = 'Something went wrong. Please try again.';
  }
}
    });

  } else {
    // ✅ CREATE
    this.bookingService.create(formValue).subscribe({
      next: () => {
        this.afterSave('Booking created successfully!');
      },
      error: (err) => {
        console.error(err);

        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.status === 409) {
          this.errorMessage = 'Student already booked for this semester';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}

afterSave(message: string) {
  this.successMessage = message;

  // auto hide success
  setTimeout(() => this.successMessage = '', 4000);

  this.form.reset();
  this.isEditing = false;
  this.selectedId = undefined!;

  this.loadBookings();
}


  edit(booking: HostelBooking) {
    this.selectedId = booking.id!;
    this.isEditing = true;
    this.form.patchValue(booking);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.delete(id).subscribe(() => this.loadBookings());
    }
  }

  // Add these properties
currentPage = 1;
itemsPerPage = 10;

get paginatedBookings() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.bookings.slice(start, start + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.bookings.length / this.itemsPerPage);
}

get startIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

get endIndex(): number {
  return Math.min(this.currentPage * this.itemsPerPage, this.bookings.length);
}

prevPage() {
  if (this.currentPage > 1) this.currentPage--;
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

resetForm() {
  this.form.reset({
    verified: false,
    allowed: false
  });
  this.isEditing = false;
  this.selectedId = undefined!;
}

}

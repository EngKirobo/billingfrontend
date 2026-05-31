import { CourseBookingResponseDTO, CourseBookingRequestDTO } from './../../interfaces/coursebooking';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseintakeResponse } from '../../interfaces/courseintake';
import { CourseResponseDTO } from '../../../shortcourse/interfaces/course';

import { CourseintakeService } from '../../services/courseintake';
import { CourseService } from '../../../shortcourse/services/course';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CoursebookingService } from '../../services/coursebooking';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { Student } from '../../interfaces/student';

@Component({
  selector: 'app-coursebooking',
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './coursebooking.html',
  styleUrls: ['./coursebooking.css']
})
export class CoursebookingComponent implements OnInit {

  courseIntakes: CourseintakeResponse[] = [];

  courses: CourseResponseDTO[] = [];

  bookings: CourseBookingResponseDTO[] = [];

  bookingForm!: FormGroup;

  editingId: number | null = null;

  loading = false;

  students: Student[] = [];

searchStudent = '';

  constructor(
    private fb: FormBuilder,
    private coursebookingService: CoursebookingService,
    private studentService: StudentService,
    private courseintakeService: CourseintakeService,
    private courseService: CourseService,
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

    this.loadCourseIntakes();
    this.loadCourses();

    this.loadBookings();

    this.loadStudents();
  }

loadCourseIntakes(): void {

  const cached = localStorage.getItem('courseIntakes');

  if (cached) {
    this.courseIntakes = JSON.parse(cached);
  }

  this.courseintakeService
    .getAllCourseintakes()
    .subscribe({

      next: (response) => {

        this.courseIntakes = response;

        localStorage.setItem(
          'courseIntakes',
          JSON.stringify(response)
        );

        this.checkDataLoaded();
      },

      error: (error) => {
        console.log(error);
      }
    });
}


pageReady = false;

checkDataLoaded(): void {

  this.pageReady =

    this.bookings.length > 0 &&
    this.students.length > 0 &&
    this.courses.length > 0 &&
    this.courseIntakes.length > 0;

  this.cdr.detectChanges();
}

loadCourses(): void {

  const cached = localStorage.getItem('courses');

  if (cached) {
    this.courses = JSON.parse(cached);
  }

  this.courseService
    .getAllCourses()
    .subscribe({

      next: (response) => {

        this.courses = response;

        localStorage.setItem(
          'courses',
          JSON.stringify(response)
        );

        this.checkDataLoaded();
      },

      error: (error) => {
        console.log(error);
      }
    });
}


getCourseDetails(intakeId: number): string {

  const intake = this.courseIntakes.find(
    i => i.id === intakeId
  );

  if (!intake) {
    return '';
  }

  const course = this.courses.find(
    c => c.id === intake.courseId
  );

  if (!course) {
    return '';
  }

  return `${course.name} - ${course.price}`;
}

  // ================= LOAD =================
  // loadBookings(): void {

  //   this.loading = true;
  //   this.cdr.detectChanges();

  //   this.coursebookingService
  //     .getAllBookings()
  //     .subscribe({

  //       next: (response) => {

  //         this.bookings = response;
  //         this.checkDataReady();
  //         this.cdr.detectChanges();

  //         this.loading = false;
  //       },

  //       error: (error) => {

  //         console.log(error);

  //         this.loading = false;
  //       }
  //     });
  // }

  loadBookings(): void {

  const cached = localStorage.getItem('bookings');

  if (cached) {
    this.bookings = JSON.parse(cached);
  }

  this.coursebookingService
    .getAllBookings()
    .subscribe({

      next: (response) => {

        this.bookings = response;

        localStorage.setItem(
          'bookings',
          JSON.stringify(response)
        );

        this.checkDataLoaded();
      },

      error: (error) => {
        console.log(error);
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

    // const confirmDelete = confirm(
    //   'Are you sure you want to delete this booking?'
    // );

    // if (!confirmDelete) {
    //   return;
    // }

    // this.coursebookingService
    //   .deleteBooking(id)
    //   .subscribe({

    //     next: () => {

    //       this.loadBookings();
    //     },

    //     error: (error) => {
    //       console.log(error);
    //     }
    //   });
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

loadStudents(): void {

  const cached = localStorage.getItem('students');

  if (cached) {
    this.students = JSON.parse(cached);
  }

  this.studentService
    .getAll()
    .subscribe({

      next: (response) => {

        this.students = response;

        localStorage.setItem(
          'students',
          JSON.stringify(response)
        );

        this.checkDataLoaded();
      },

      error: (error) => {
        console.log(error);
      }
    });
}

filteredStudents(): Student[] {

  if (!this.searchStudent) {
    return [];
  }

  const search = this.searchStudent.toLowerCase();

  return this.students.filter(student =>

    student.name.toLowerCase().includes(search)

    ||

    student.admino.toLowerCase().includes(search)
  );
}


selectStudent(student: Student): void {

  this.bookingForm.patchValue({

    studId: student.id
  });

  this.searchStudent =
    student.admino +
    ' - ' +
    student.name;
}



getStudentName(studId: number): string {

  const student = this.students.find(
    s => s.id === studId
  );

  return student
    ? student.name
    : '';
}

dataReady = false;

checkDataReady(): void {

  this.dataReady =
    this.bookings.length > 0 &&
    this.students.length > 0 &&
    this.courses.length > 0 &&
    this.courseIntakes.length > 0;

  if (this.dataReady) {

    console.log('All data loaded successfully');

    this.cdr.detectChanges();
  }
}

}

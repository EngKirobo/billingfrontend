import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CourseService
} from '../../services/course';

import {
  CourseResponseDTO
} from '../../interfaces/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './course.html',
  styleUrls: ['./course.css']
})

export class CourseComponent
implements OnInit {

  courseForm!: FormGroup;

  courses: CourseResponseDTO[] = [];

  editingId: number | null = null;

  successMessage = '';

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.courseForm = this.fb.group({

      name: ['', Validators.required],

      description: [''],

      price: [''],

      deptId: ['']

    });

    this.loadCourses();
    this.cdr.detectChanges();
  }

  loadCourses(): void {

    this.courseService
      .getAllCourses()
      .subscribe({

        next: (data) => {

          this.courses = data;
          this.cdr.detectChanges();

        },

        error: () => {

          this.errorMessage =
            'Failed to load courses';

        }
      });
  }

  submit(): void {

    if (this.courseForm.invalid) {

      this.courseForm.markAllAsTouched();

      return;
    }

    const payload =
      this.courseForm.value;

    // UPDATE
    if (this.editingId) {

      this.courseService
        .updateCourse(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.successMessage =
              'Course updated successfully';

            this.resetForm();

            this.loadCourses();
          },

          error: () => {

            this.errorMessage =
              'Failed to update course';
          }
        });

    } else {

      // CREATE
      this.courseService
        .createCourse(payload)
        .subscribe({

          next: () => {

            this.successMessage =
              'Course created successfully';

            this.resetForm();

            this.loadCourses();
          },

          error: () => {

            this.errorMessage =
              'Failed to create course';
          }
        });
    }
  }

  editCourse(
    course: CourseResponseDTO
  ): void {

    this.editingId = course.id;

    this.courseForm.patchValue({

      name: course.name,

      description: course.description,

      price: course.price,

      deptId: course.deptId
    });
  }

  deleteCourse(id: number): void {

    if (!confirm(
      'Delete this course?'
    )) return;

    this.courseService
      .deleteCourse(id)
      .subscribe({

        next: () => {

          this.successMessage =
            'Course deleted successfully';

          this.loadCourses();
        },

        error: () => {

          this.errorMessage =
            'Failed to delete course';
        }
      });
  }

  resetForm(): void {

    this.editingId = null;

    this.courseForm.reset();
  }
}

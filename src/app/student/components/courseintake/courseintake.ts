import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';

import { CourseintakeService } from '../../services/courseintake';

import { CourseintakeRequest, CourseintakeResponse } from '../../interfaces/courseintake';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courseintake',
  imports:[ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './courseintake.html',
  styleUrls: ['./courseintake.css']
})
export class CourseintakeComponent implements OnInit {

  courseintakes: CourseintakeResponse[] = [];

  courseintakeForm!: FormGroup;


  editingId: number | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private courseintakeService: CourseintakeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.courseintakeForm = this.fb.group({
      courseId: ['', Validators.required]
    });

    this.loadCourseintakes();
    this.cdr.detectChanges();
  }

  // ================= LOAD =================
  loadCourseintakes(): void {

    this.loading = true;

    this.courseintakeService
      .getAllCourseintakes()
      .subscribe({

        next: (response) => {

          this.courseintakes = response;
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
  saveCourseintake(): void {

    if (this.courseintakeForm.invalid) {
      return;
    }

    const payload: CourseintakeRequest = {
      courseId: this.courseintakeForm.value.courseId
    };

    // UPDATE
    if (this.editingId !== null) {

      this.courseintakeService
        .updateCourseintake(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.loadCourseintakes();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });

    } else {

      // CREATE
      this.courseintakeService
        .createCourseintake(payload)
        .subscribe({

          next: () => {

            this.loadCourseintakes();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  // ================= EDIT =================
  editCourseintake(
    item: CourseintakeResponse
  ): void {

    this.editingId = item.id;

    this.courseintakeForm.patchValue({
      courseId: item.courseId
    });
  }

  // ================= DELETE =================
  deleteCourseintake(id: number): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this record?'
    );

    if (!confirmDelete) {
      return;
    }

    this.courseintakeService
      .deleteCourseintake(id)
      .subscribe({

        next: () => {

          this.loadCourseintakes();
        },

        error: (error) => {
          console.log(error);
        }
      });
  }

  // ================= RESET =================
  resetForm(): void {

    this.courseintakeForm.reset();

    this.editingId = null;
  }
}

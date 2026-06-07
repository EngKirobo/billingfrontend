import { Program } from './../../../student/interfaces/program';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  CourseService
} from '../../services/course';

import { DepartmentService } from '../../../student/services/department';
import { Department } from '../../../student/interfaces/department';

import { ProgramService } from '../../../student/services/program';

import {
  CourseResponseDTO
} from '../../interfaces/course';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './course.html',
  styleUrls: ['./course.css']
})

export class CourseComponent implements OnInit {

    programs: Program[] = [];

    searchTerm: string = '';

 departments: Department[] = [];

  courseForm!: FormGroup;

  courses: CourseResponseDTO[] = [];

  editingId: number | null = null;

  successMessage = '';

  errorMessage = '';

  showForm = false;



  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private programService: ProgramService,
    private router: Router,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.courseForm = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      price: ['', Validators.required],

      programId: ['', Validators.required],

    });






    this.loadCourses();
    this.loadDepartments();
    this.cdr.detectChanges();
     this.loadPrograms();
  }



selectCourse(course: any): void {

  this.router.navigate(
    ['/kozdashboard/kozstudents'],
    {
      state: {
        selectedCourse: {
          programId: course.programId,
          coursename: course.name,
          courseprice: course.price
        }
      }
    }
  );

}


  get filteredCourses() {
  if (!this.searchTerm.trim()) {
    return this.courses;
  }

  const term = this.searchTerm.toLowerCase();

  return this.courses.filter(course =>
    course.name.toLowerCase().includes(term)
  );
}



    addNewCourse() {
      this.showForm = true;
    }

  loadPrograms(): void {

  this.programService
    .getAll()
    .subscribe({

      next: (response) => {

        this.programs = response;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);
      }
    });
}

getDepartmentName(deptId: number): string {

  const dept = this.departments.find(
    d => d.id === deptId
  );

  return dept
    ? dept.name
    : '';
}

getProgramName(programId: number): string {

  const program = this.programs.find(
    p => p.id === programId
  );

  return program
    ? program.name
    : '';
}

  loadDepartments(): void {

  this.departmentService
    .getAll()
    .subscribe({

      next: (response) => {

        this.departments = response;
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);
      }
    });
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
    this.showForm = true;

    this.courseForm.patchValue({

      name: course.name,

      description: course.description,

      price: course.price,

      programId: course.programId
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

    this.showForm = false; // optional: hide form after reset
  }
}

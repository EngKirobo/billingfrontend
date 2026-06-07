import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { KozstudentRequest, KozstudentResponse } from '../../interfaces/kozstudent';

import { KozstudentService } from '../../services/kozstudent';
import { Program, ProgramRequest } from '../../interfaces/program';
import { ProgramService } from '../../services/program';

@Component({
  selector: 'app-kozstudent',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './kozstudent.html',
  styleUrls: ['./kozstudent.css']
})
export class KozstudentComponent
implements OnInit {

  programs: Program[] = [];



  students: KozstudentResponse[] = [];

  studentForm!: FormGroup;

  editingId: number | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: KozstudentService,
     private programService: ProgramService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.studentForm =
      this.fb.group({

        fullname: [ '', Validators.required ],

        coursename: [ '', Validators.required ],

        courseprice: [ '', Validators.required ],

        programId: [ '', Validators.required ],

        accessed: [false]
      });

    this.loadStudents();
    this.loadPrograms();
    this.studentForm.get('programId')?.disable();


const state = history.state;

  if (state.selectedCourse) {

    this.studentForm.patchValue({

      programId: state.selectedCourse.programId,
      coursename: state.selectedCourse.coursename,
      courseprice: state.selectedCourse.courseprice

    });

  }



    // Restore saved values
  const savedData = localStorage.getItem('studentFormData');

  if (savedData) {
    this.studentForm.patchValue(JSON.parse(savedData));
  }

  // Auto-save whenever values change
  this.studentForm.valueChanges.subscribe(value => {

    localStorage.setItem(
      'studentFormData',
      JSON.stringify({
        programId: value.programId,
        coursename: value.coursename,
        courseprice: value.courseprice
      })
    );

  });
  }



  get lastTenStudents() {
  return this.students.slice(-10).reverse();
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

  loadStudents(): void {

    this.loading = true;

    this.service
      .getAll()
      .subscribe({

        next: (response) => {

          this.students = response.sort((a, b) =>
            new Date(b.createdAt!).getTime() -
            new Date(a.createdAt!).getTime()
          );

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }


  save(): void {

  if (this.studentForm.invalid) {

    this.studentForm.markAllAsTouched();

    const firstInvalidControl =
      document.querySelector('.ng-invalid') as HTMLElement;

    if (firstInvalidControl) {

      firstInvalidControl.focus();

      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    return;
  }

  // EDIT MODE
  if (this.editingId !== null) {

    const payload: KozstudentRequest =
      this.studentForm.value;

    this.service
      .update(this.editingId, payload)
      .subscribe({

        next: () => {

          this.loadStudents();

          this.resetForm();
        },

        error: (error) => {

          console.log(error);
        }
      });

    return;
  }

  // CREATE MODE - MULTIPLE STUDENTS

  const names = this.studentForm.value.fullname
    .split('\n')
    .map((name: string) => name.trim())
    .filter((name: string) => name.length > 0);

  names.forEach((name: string) => {

    const payload: KozstudentRequest = {

      fullname: name,

      coursename: this.studentForm.value.coursename,

      courseprice: this.studentForm.value.courseprice,

      programId: this.studentForm.value.programId,

      accessed: false
    };

    this.service.create(payload).subscribe({
      next: () => {},
      error: (error) => console.log(error)
    });

  });

  this.loadStudents();

  this.resetForm();
}



  edit(
    student: KozstudentResponse
  ): void {

    this.editingId =
      student.id;

    this.studentForm.patchValue({

      fullname:
        student.fullname,

      coursename:
        student.coursename,

      courseprice:
        student.courseprice,

        programId: student.programId,

      accessed:
        student.accessed
    });
  }

  delete(
    id: number
  ): void {

    if (
      !confirm(
        'You have No Authority to Delete this student?'
      )
    ) {
      return;
    }

    this.service
      .delete(id)
      .subscribe({

        next: () => {

          this.loadStudents();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }




  resetForm(): void {

  const currentValues = {
    programId: this.studentForm.value.programId,
    coursename: this.studentForm.value.coursename,
    courseprice: this.studentForm.value.courseprice
  };

  this.studentForm.reset({

    fullname: '',

    programId: currentValues.programId,

    coursename: currentValues.coursename,

    courseprice: currentValues.courseprice

  });

  this.editingId = null;
}

}

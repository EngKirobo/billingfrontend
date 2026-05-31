import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {  FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { KozstudentRequest, KozstudentResponse } from '../../interfaces/kozstudent';

import { KozstudentService } from '../../services/kozstudent';

@Component({
  selector: 'app-kozstudent',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './kozstudent.html',
  styleUrls: ['./kozstudent.css']
})
export class KozstudentComponent
implements OnInit {

  students: KozstudentResponse[] = [];

  studentForm!: FormGroup;

  editingId: number | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: KozstudentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.studentForm =
      this.fb.group({

        fullname: [
          '',
          Validators.required
        ],

        coursename: [
          '',
          Validators.required
        ],

        courseprice: [
          '',
          Validators.required
        ],

        accessed: [false]
      });

    this.loadStudents();
  }

  loadStudents(): void {

    this.loading = true;

    this.service
      .getAll()
      .subscribe({

        next: (response) => {

          this.students = response;

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
      return;
    }

    const payload:
      KozstudentRequest =
      this.studentForm.value;

    if (this.editingId !== null) {

      this.service
        .update(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.loadStudents();

            this.resetForm();
          },

          error: (error) => {

            console.log(error);
          }
        });

    } else {

      this.service
        .create(payload)
        .subscribe({

          next: () => {

            this.loadStudents();

            this.resetForm();
          },

          error: (error) => {

            console.log(error);
          }
        });
    }
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

      accessed:
        student.accessed
    });
  }

  delete(
    id: number
  ): void {

    if (
      !confirm(
        'Delete this student?'
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

    this.studentForm.reset({

      accessed: false
    });

    this.editingId = null;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';
import { Student } from '../../interfaces/student';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-form',
  imports:[CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterOutlet],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentFormComponent implements OnInit {

  studentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {

    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      admino: [''],
      email: [''],
      country: [''],
      dob: [''],
      genderId: [''],
      entryId: [''],
      programId: [''],
      intakeId: [''],
      telephone: ['']
    });

  }

  submit(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.value;

    const currentYear = new Date().getFullYear();

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const generatedStudent: Student = {

      name: formValue.name,

      admino:
        formValue.admino ||
        `AD${currentYear}${Date.now()}`,

      email:
        formValue.email ||
        `${formValue.name.replace(/\s+/g, '').toLowerCase()}${randomNumber}@atc.com`,

      country:
        formValue.country || 'Tz',

      dob:
        formValue.dob || '2000-01-01',

      genderId:
        formValue.genderId || 1,

      entryId:
        formValue.entryId || 1,

      programId:
        formValue.programId || 1,

      intakeId:
        formValue.intakeId || 1,

      telephone:
        formValue.telephone || '0912223344'
    };

    console.log(generatedStudent);

    this.studentService.create(generatedStudent).subscribe({
      next: (response) => {

        console.log(response);

        alert('Student saved successfully');

        this.studentForm.reset();

      },

      error: (error) => {

        console.error(error);

        alert('Failed to save student');

      }
    });

  }

}

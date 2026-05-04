import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule,FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentService } from '../../services/student';
import { Student } from '../../interfaces/student';

import { IntakeService } from '../../../hostel/services/intake';
import { Intake } from '../../../hostel/interfaces/intake';

import { GenderService } from '../../../hostel/services/gender';
import { Gender } from '../../../hostel/interfaces/gender';

import { EduLevelService } from '../../../hostel/services/edulevel';
import { EduLevel } from '../../../hostel/interfaces/edulevel';

import {  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];



  @ViewChild('nameInput') nameInput!: ElementRef;

  // ✅ Initialize directly (NO resetForm)
  student: Student = {
    name: '',
    admino: '',
    email: '',
    country: '',
    dob: '',
    genderId: null!,
    entryId: null!,
    programId: null!,
    intakeId: null!,
    telephone: ''
  };

  isEditing = false;



  // ✅ LocalStorage key
  private STORAGE_KEY = 'student_persistent_fields';

  constructor(private studentService: StudentService,
                  private fb: FormBuilder,
                  private cdr: ChangeDetectorRef,
                  private intakeService: IntakeService,
                  private genderService: GenderService,
                  private edulevelService: EduLevelService,

  ) {}

  ngOnInit(): void {
    this.load();
    this.loadSavedFields();
  }

  // ================= LOAD =================
  load() {
    this.studentService.getAll().subscribe({
      next: (data) => {this.students = data,
                        this.cdr.detectChanges();},
      error: (err) => console.error(err)
    });
  }

  // ================= SAVE =================
  save() {
    if (this.isEditing && this.student.id) {
      this.studentService.update(this.student.id, this.student).subscribe(() => {
        this.afterAction('updated');
      });
    } else {
      this.studentService.create(this.student).subscribe(() => {
        this.afterAction('created');
      });
    }
  }

  // ================= EDIT =================
  edit(s: Student) {
    this.student = { ...s };
    this.isEditing = true;

    setTimeout(() => {
    this.nameInput.nativeElement.focus();
  }, 0);
  }

  // ================= DELETE =================
  delete(id: number) {
    if (confirm('Delete student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.load();
      });
    }
  }

  // ================= AFTER SAVE =================
  afterAction(action: string) {

    // ✅ Save persistent fields BEFORE clearing
    this.savePersistentFields();

    // ❌ DO NOT reset everything
    // ✅ Only clear temporary fields
    this.student = {
      ...this.student, // keep persistent ones
      name: '',
      admino: '',
      email: '',
      country: '',
      dob: '',
      telephone: ''
    };

    this.isEditing = false;
    this.load();
  }

  // ================= LOCAL STORAGE =================
  savePersistentFields() {
    const data = {
      genderId: this.student.genderId,
      entryId: this.student.entryId,
      programId: this.student.programId,
      intakeId: this.student.intakeId,
      country:this.student.country
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  loadSavedFields() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);

      this.student.genderId = data.genderId ?? null;
      this.student.entryId = data.entryId ?? null;
      this.student.programId = data.programId ?? null;
      this.student.intakeId = data.intakeId ?? null;
      this.student.country=data.country ?? null;
    }
  }

  searchTerm: string = '';

  filteredStudents(): Student[] {
  if (!this.searchTerm) return this.students;

  const term = this.searchTerm.toLowerCase();

  return this.students.filter(s =>
    (s.name?.toLowerCase().includes(term)) ||
    (s.admino?.toLowerCase().includes(term)) ||
    (s.email?.toLowerCase().includes(term)) ||
    (s.country?.toLowerCase().includes(term)) ||
    (s.telephone?.toLowerCase().includes(term))
  );
}
}

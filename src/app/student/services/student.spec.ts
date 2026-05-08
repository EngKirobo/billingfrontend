import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];

  constructor() {}

  // Basic method to test
  addStudent(student: Student): void {
    this.students.push(student);
  }

  getStudents(): Student[] {
    return this.students;
  }
}

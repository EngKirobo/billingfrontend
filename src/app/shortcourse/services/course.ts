import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  CourseRequestDTO
} from '../interfaces/course';

import {
  CourseResponseDTO
} from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private apiUrl =
    'http://localhost:8080/api/courses';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // CREATE
  createCourse(
    course: CourseRequestDTO
  ): Observable<CourseResponseDTO> {

    return this.http.post<CourseResponseDTO>(
      this.apiUrl,
      course,
      {
        headers: this.getHeaders()
      }
    );
  }

  // GET ALL
  getAllCourses():
    Observable<CourseResponseDTO[]> {

    return this.http.get<CourseResponseDTO[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  // GET BY ID
  getCourseById(
    id: number
  ): Observable<CourseResponseDTO> {

    return this.http.get<CourseResponseDTO>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // UPDATE
  updateCourse(
    id: number,
    course: CourseRequestDTO
  ): Observable<CourseResponseDTO> {

    return this.http.put<CourseResponseDTO>(
      `${this.apiUrl}/${id}`,
      course,
      {
        headers: this.getHeaders()
      }
    );
  }

  // DELETE
  deleteCourse(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }

  // GET BY DEPARTMENT
  getByProgram(
    programId: number
  ): Observable<CourseResponseDTO[]> {

    return this.http.get<CourseResponseDTO[]>(
      `${this.apiUrl}/program/${programId}`,
      {
        headers: this.getHeaders()
      }
    );
  }
}

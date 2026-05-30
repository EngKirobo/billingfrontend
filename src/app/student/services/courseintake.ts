import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  CourseintakeRequest,
  CourseintakeResponse
} from '../../student/interfaces/courseintake';

@Injectable({
  providedIn: 'root'
})
export class CourseintakeService {

  private apiUrl = 'http://localhost:8080/api/itakes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ================= CREATE =================
  createCourseintake(
    payload: CourseintakeRequest
  ): Observable<CourseintakeResponse> {

    return this.http.post<CourseintakeResponse>(
      this.apiUrl,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ ALL =================
  getAllCourseintakes():
    Observable<CourseintakeResponse[]> {

    return this.http.get<CourseintakeResponse[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ ONE =================
  getCourseintakeById(
    id: number
  ): Observable<CourseintakeResponse> {

    return this.http.get<CourseintakeResponse>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= UPDATE =================
  updateCourseintake(
    id: number,
    payload: CourseintakeRequest
  ): Observable<CourseintakeResponse> {

    return this.http.put<CourseintakeResponse>(
      `${this.apiUrl}/${id}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ================= DELETE =================
  deleteCourseintake(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}

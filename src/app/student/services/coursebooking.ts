import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  CourseBookingRequestDTO,
  CourseBookingResponseDTO
} from '../../student/interfaces/coursebooking';

@Injectable({
  providedIn: 'root'
})
export class CoursebookingService {

  private apiUrl =
    'http://localhost:8080/api/coursebookings';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ================= CREATE =================
  createBooking(
    payload: CourseBookingRequestDTO
  ): Observable<CourseBookingResponseDTO> {

    return this.http.post<CourseBookingResponseDTO>(
      this.apiUrl,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ ALL =================
  getAllBookings():
    Observable<CourseBookingResponseDTO[]> {

    return this.http.get<CourseBookingResponseDTO[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ BY ID =================
  getBookingById(
    id: number
  ): Observable<CourseBookingResponseDTO> {

    return this.http.get<CourseBookingResponseDTO>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ BY STUDENT =================
  getBookingsByStudent(
    studId: number
  ): Observable<CourseBookingResponseDTO[]> {

    return this.http.get<CourseBookingResponseDTO[]>(
      `${this.apiUrl}/student/${studId}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= READ BY INTAKE =================
  getBookingsByIntake(
    intakeId: number
  ): Observable<CourseBookingResponseDTO[]> {

    return this.http.get<CourseBookingResponseDTO[]>(
      `${this.apiUrl}/intake/${intakeId}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= UPDATE =================
  updateBooking(
    id: number,
    payload: CourseBookingRequestDTO
  ): Observable<CourseBookingResponseDTO> {

    return this.http.put<CourseBookingResponseDTO>(
      `${this.apiUrl}/${id}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ================= DELETE =================
  deleteBooking(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}

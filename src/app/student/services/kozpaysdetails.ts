import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Kozpaysdetails } from '../interfaces/kozpaysdetails';

@Injectable({
  providedIn: 'root'
})
export class KozpaysdetailsService {

  private apiUrl =
    'http://localhost:8080/api/kozpaysdetails';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ================= GET ALL =================
  getAll():
    Observable<Kozpaysdetails[]> {

    return this.http.get<Kozpaysdetails[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  // ================= GET BY ID =================
  getById(
    id: number
  ): Observable<Kozpaysdetails> {

    return this.http.get<Kozpaysdetails>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= GET BY STUDENT =================
  getByStudent(
    studId: number
  ): Observable<Kozpaysdetails[]> {

    return this.http.get<Kozpaysdetails[]>(
      `${this.apiUrl}/student/${studId}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= GET BY INTAKE =================
  getByIntake(
    intakeId: number
  ): Observable<Kozpaysdetails[]> {

    return this.http.get<Kozpaysdetails[]>(
      `${this.apiUrl}/intake/${intakeId}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= GET BY COURSE =================
  getByCourse(
    courseName: string
  ): Observable<Kozpaysdetails[]> {

    return this.http.get<Kozpaysdetails[]>(
      `${this.apiUrl}/course/${courseName}`,
      { headers: this.getHeaders() }
    );
  }

  // ================= GET BY CONTROL NUMBER =================
  getByControlNumber(
    controlnumber: string
  ): Observable<Kozpaysdetails> {

    return this.http.get<Kozpaysdetails>(
      `${this.apiUrl}/control/${controlnumber}`,
      { headers: this.getHeaders() }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Intake, IntakeRequest } from '../interfaces/intake';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  private apiUrl = 'http://localhost:8080/api/intakes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // PUBLIC
  getAll(): Observable<Intake[]> {
    return this.http.get<Intake[]>(this.apiUrl);
  }

  getById(id: number): Observable<Intake> {
    return this.http.get<Intake>(`${this.apiUrl}/${id}`);
  }

  // PROTECTED
  create(data: IntakeRequest): Observable<Intake> {
    return this.http.post<Intake>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  update(id: number, data: IntakeRequest): Observable<Intake> {
    return this.http.put<Intake>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

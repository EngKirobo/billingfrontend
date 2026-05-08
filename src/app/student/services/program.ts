import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program, ProgramRequest } from '../interfaces/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private apiUrl = 'http://localhost:8080/api/programs';

  constructor(private http: HttpClient) {}

  // ✅ ADD THIS METHOD
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ GET ALL
  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // ✅ GET BY ID
  getById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ✅ CREATE
  create(data: ProgramRequest): Observable<Program> {
    return this.http.post<Program>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  // ✅ UPDATE
  update(id: number, data: ProgramRequest): Observable<Program> {
    return this.http.put<Program>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  // ✅ DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

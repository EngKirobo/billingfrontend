import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, DepartmentRequest } from '../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://localhost:8080/api/departments'; // 🔁 adjust if needed

  constructor(private http: HttpClient) {}

  // ✅ AUTH HEADER
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ GET ALL
  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // ✅ GET BY ID
  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ✅ CREATE
  create(data: DepartmentRequest): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  // ✅ UPDATE
  update(id: number, data: DepartmentRequest): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, data, {
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

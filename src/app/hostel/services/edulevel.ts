import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EduLevel } from '../interfaces/edulevel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EduLevelService {

  private apiUrl = 'http://localhost:8080/api/edulevels';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<EduLevel[]> {
    return this.http.get<EduLevel[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<EduLevel> {
    return this.http.get<EduLevel>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(data: EduLevel): Observable<EduLevel> {
    return this.http.post<EduLevel>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  update(id: number, data: EduLevel): Observable<EduLevel> {
    return this.http.put<EduLevel>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

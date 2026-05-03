import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gender } from '../interfaces/gender';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = 'http://localhost:8080/api/genders';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Gender> {
    return this.http.get<Gender>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(data: { gender: string }): Observable<Gender> {
    return this.http.post<Gender>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  update(id: number, data: { gender: string }): Observable<Gender> {
    return this.http.put<Gender>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}

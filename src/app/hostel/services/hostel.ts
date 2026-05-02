import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hostel, HostelRequest } from '../../hostel/interfaces/hostel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  private apiUrl = 'http://localhost:8080/api/hostels';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Hostel[]> {
    return this.http.get<Hostel[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<Hostel> {
    return this.http.get<Hostel>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(data: HostelRequest): Observable<Hostel> {
    return this.http.post<Hostel>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  update(id: number, data: HostelRequest): Observable<Hostel> {
    return this.http.put<Hostel>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

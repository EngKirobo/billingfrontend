import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HostelBooking } from '../interfaces/hostelbooking';

@Injectable({
  providedIn: 'root'
})
export class HostelBookingService {

  private apiUrl = 'http://localhost:8080/api/hostelbookings'; // Adjust if your endpoint is different

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<HostelBooking[]> {
    return this.http.get<HostelBooking[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<HostelBooking> {
    return this.http.get<HostelBooking>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(data: HostelBooking): Observable<HostelBooking> {
    return this.http.post<HostelBooking>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  update(id: number, data: HostelBooking): Observable<HostelBooking> {
    return this.http.put<HostelBooking>(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}

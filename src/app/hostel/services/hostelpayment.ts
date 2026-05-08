import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, PaymentRequest } from '../interfaces/hostelpayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  // ✅ AUTH HEADER
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ✅ GET ALL
  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // ✅ GET BY ID
  getById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // ✅ CREATE
  create(data: PaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  // ✅ UPDATE
  update(id: number, data: PaymentRequest): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, data, {
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

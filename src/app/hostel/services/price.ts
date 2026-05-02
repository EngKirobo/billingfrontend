import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Price, PriceRequest } from '../interfaces/price';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private apiUrl = 'http://localhost:8080/api/prices';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // PUBLIC (no token required)
  getAll(): Observable<Price[]> {
    return this.http.get<Price[]>(this.apiUrl);
  }

  getById(id: number): Observable<Price> {
    return this.http.get<Price>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(data: PriceRequest): Observable<Price> {
    return this.http.post<Price>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  update(id: number, data: PriceRequest): Observable<Price> {
    return this.http.put<Price>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

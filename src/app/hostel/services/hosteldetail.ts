import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostelDetail, HostelDetailRequest } from '../interfaces/hosteldetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostelDetailService {

  private apiUrl = 'http://localhost:8080/api/hosteldetails';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<HostelDetail[]> {
    return this.http.get<HostelDetail[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  getById(id: number): Observable<HostelDetail> {
    return this.http.get<HostelDetail>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  create(data: HostelDetailRequest): Observable<HostelDetail> {
    return this.http.post<HostelDetail>(this.apiUrl, data, {
      headers: this.getHeaders()
    });
  }

  update(id: number, data: HostelDetailRequest): Observable<HostelDetail> {
    return this.http.put<HostelDetail>(`${this.apiUrl}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}

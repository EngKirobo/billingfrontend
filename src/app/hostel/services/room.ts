import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room, RoomRequest } from '../interfaces/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  create(data: RoomRequest): Observable<Room> {
    return this.http.post<Room>(
      this.apiUrl,
      data,
      { headers: this.getHeaders() }
    );
  }

  update(id: number, data: RoomRequest): Observable<Room> {
    return this.http.put<Room>(
      `${this.apiUrl}/${id}`,
      data,
      { headers: this.getHeaders() }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}

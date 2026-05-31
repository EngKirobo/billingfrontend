import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  KozstudentRequest,
  KozstudentResponse
} from '../interfaces/kozstudent';

@Injectable({
  providedIn: 'root'
})
export class KozstudentService {

  private apiUrl =
    'http://localhost:8080/api/kozstudents';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<KozstudentResponse[]> {

    return this.http.get<KozstudentResponse[]>(
      this.apiUrl
    );
  }

  getById(
    id: number
  ): Observable<KozstudentResponse> {

    return this.http.get<KozstudentResponse>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    data: KozstudentRequest
  ): Observable<KozstudentResponse> {

    return this.http.post<KozstudentResponse>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: KozstudentRequest
  ): Observable<KozstudentResponse> {

    return this.http.put<KozstudentResponse>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}

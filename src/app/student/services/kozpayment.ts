import { KozpaymentResponse } from './../interfaces/kozpayment';
import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { KozpaymentRequest } from '../interfaces/kozpayment';

@Injectable({
  providedIn: 'root',
})
export class KozpaymentService {

   private apiUrl = 'http://localhost:8080/api/kozpayments';

     constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

    // ================= CREATE =================
    createKozpayment(
      payload: KozpaymentRequest
    ): Observable<KozpaymentResponse> {

      return this.http.post<KozpaymentResponse>(
        this.apiUrl,
        payload,
        { headers: this.getHeaders() }
      );
    }

      // ================= READ ALL =================
      getAllKozpayments():
        Observable<KozpaymentResponse[]> {

        return this.http.get<KozpaymentResponse[]>(
          this.apiUrl,
          { headers: this.getHeaders() }
        );
      }

        getKozpaymentById(id: number): Observable<KozpaymentResponse> {
          return this.http.get<KozpaymentResponse>(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
          );
        }


        // ================= UPDATE =================
        updateKozpayment(
          id: number,
          payload: KozpaymentRequest
        ): Observable<KozpaymentResponse> {

          return this.http.put<KozpaymentResponse>(
            `${this.apiUrl}/${id}`,
            payload,
            { headers: this.getHeaders() }
          );
        }

        // ================= DELETE =================
        deleteKozpayment(
          id: number
        ): Observable<any> {

          return this.http.delete(
            `${this.apiUrl}/${id}`,
            { headers: this.getHeaders() }
          );
        }

}

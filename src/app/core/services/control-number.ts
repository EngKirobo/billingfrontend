import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlNumberService {

  private apiUrl = `${environment.apiBaseUrl}/generate-control-numbers`;   // Adjust according to your backend route prefix

  constructor(private http: HttpClient) { }

  /**
   * Generate Control Numbers for eligible hostel bookings
   */
  generateControlNumbers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add authorization if needed:
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(
      `${this.apiUrl}`,
      {},
      { headers }
    );
  }
}

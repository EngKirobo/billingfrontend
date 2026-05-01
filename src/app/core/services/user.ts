import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('auth_token'); // ✅ correct

    if (!token) {
      console.error('No token found. User not authenticated.');
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
  }

  // ✅ Get all users (admin only)
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/users`, {
      headers: this.getHeaders()
    });
  }

    // ✅ Update user role
  updateUserRole(userId: number, roleId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/admin/update-role`,
      {
        userId: userId,
        roleId: roleId
      },
      { headers: this.getHeaders() }
    );
  }
}

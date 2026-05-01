import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080/api/admin/roles';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // match your AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}`, {
      headers: this.getHeaders()
    });
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/permissions`, {
      headers: this.getHeaders()
    });
  }

  updateRolePermissions(roleId: number, permissionIds: number[]) {
    return this.http.put(
      `${this.baseUrl}/update-permissions`,
      { roleId, permissionIds },
      { headers: this.getHeaders() }
    );
  }
}

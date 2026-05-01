import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, AuthResponse, CheckEmailResponse, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // Store token in localStorage (or use a BehaviorSubject for more advanced state)
  private readonly TOKEN_KEY = 'auth_token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Register a new user */
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        if (response.token) this.setToken(response.token);
      }),
      catchError(this.handleError)
    );
  }

  /** Login and get JWT */
  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest).pipe(
      tap(response => {
        if (response.token) this.setToken(response.token);
      }),
      catchError(this.handleError)
    );
  }

  /** Check if email exists */
  checkEmail(email: string): Observable<CheckEmailResponse> {
    return this.http.get<CheckEmailResponse>(`${this.apiUrl}/check-email`, {
      params: { email }
    }).pipe(
      catchError(this.handleError)
    );
  }

  /** Logout */
  logout(): void {
    this.removeToken();
    // You can also call a backend logout endpoint if needed
  }

  /** HTTP Interceptor friendly - returns headers with Bearer token */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  private handleError(error: any) {
    console.error('Auth error:', error);
    let errorMsg = 'An error occurred';

    if (error.error?.error) {
      errorMsg = error.error.error;
    } else if (error.status === 401) {
      errorMsg = 'Invalid credentials';
    } else if (error.status === 400) {
      errorMsg = error.error?.message || 'Bad request';
    }

    return throwError(() => new Error(errorMsg));
  }
}

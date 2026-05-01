import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ensure this path is correct
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  let cloned = req;

  // 1. Attach the token to the outgoing request
  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Handle the response and watch for expiration errors
  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      // Check for 401 (Unauthorized) or 403 (Forbidden)
      if (error.status === 401 || error.status === 403) {
        console.warn('Session expired or unauthorized. Redirecting to login...');

        // 3. Clear local storage/state via your service
        authService.logout();

        // 4. Redirect to login page
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

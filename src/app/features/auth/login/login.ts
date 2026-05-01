import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginData: LoginRequest = { email: '', password: '' };
  errorMessage = '';
  isLoading = false;

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      // next: () => {
      //   this.router.navigate(['/adminroles']);   // or wherever you want to go
                // },
          next: () => {

            if (this.authService.hasPermission('USER_UPDATE')) {
              // user has admin-level permission
              this.router.navigate(['/admin']);

            } else if (this.authService.hasPermission('USER_READ')) {
              // user can at least view users/dashboard
              this.router.navigate(['/dashboard']);

            } else {
              // fallback (no meaningful permissions)
              this.router.navigate(['/unauthorized']); // or home
            }

          },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }
}

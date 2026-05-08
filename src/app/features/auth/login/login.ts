import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
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
  constructor(   private route: ActivatedRoute) {}

loginData: LoginRequest = { email: '', password: '' };
errorMessage = '';
isLoading = false;

onSubmit() {

  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(this.loginData).subscribe({

    next: (res) => {

      // SAVE TOKEN
      this.authService.setToken(res.token);

      // GET RETURN URL
      const returnUrl =
        this.route.snapshot.queryParams['returnUrl'];

      // IF USER WAS REDIRECTED TO LOGIN
      if (returnUrl) {

        this.router.navigateByUrl(returnUrl);

      } else {

        // NORMAL LOGIN REDIRECTION

        if (this.authService.hasPermission('USER_UPDATE')) {

          // ADMIN
          this.router.navigate(['/admin']);

        } else if (this.authService.hasPermission('USER_READ')) {

          // NORMAL USER
          this.router.navigate(['/dashboard']);

        } else {

          // NO PERMISSION
          this.router.navigate(['/unauthorized']);
        }
      }

      this.isLoading = false;
    },

    error: (err) => {

      this.errorMessage = err.message;
      this.isLoading = false;
    }

  });
}}

import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form model matching your User entity
  user: User = {
    name: '',
    email: '',
    password: '',
  };

  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  isEmailChecking: boolean = false;
  emailExists: boolean = false;

  // Real-time email availability check
  onEmailChange() {
    if (!this.user.email || this.user.email.length < 5) {
      this.emailExists = false;
      return;
    }

    this.isEmailChecking = true;

    this.authService.checkEmail(this.user.email).subscribe({
      next: (response) => {
        this.emailExists = response.exists;
        this.isEmailChecking = false;
      },
      error: () => {
        this.isEmailChecking = false;
      },
    });
  }

  onSubmit() {
    // Basic client-side validation
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.user.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (this.emailExists) {
      this.errorMessage = 'This email is already registered';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';

        // Auto redirect to login after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Registration failed. Please try again.';
      },
    });
  }
}

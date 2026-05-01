import { Component } from '@angular/core';
import { AdminUsers } from '../../admin-users/admin-users';
import { RolePermissions } from '../role-permissions/role-permissions';
import { Login } from '../../features/auth/login/login';
import { Register } from '../../features/auth/register/register';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';     // ← Import this
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admindashboard',
  imports: [CommonModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {

  constructor(private router: Router,
              private authService: AuthService
  ) {}   // ← Inject Router here

// logout() {
//     // Clear token / user data
//     localStorage.removeItem('token');     // if you're using localStorage
//     // sessionStorage.removeItem('token'); // if using sessionStorage

//     // Redirect to login page
//     this.router.navigate(['/login']).then(() => {
//       window.location.reload();     // Optional: force refresh to clear any cached data
//     });
//   }

// In Admindashboard component or in AuthService

logout() {
  if (confirm('Are you sure you want to logout?')) {

    // Clear everything related to authentication and permissions
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');   // ← Important if you store permissions separately

    // If you're using BehaviorSubject in AuthService, reset it
    this.authService.logout();   // ← Call this if you have logout() in AuthService

    // Redirect to login
    this.router.navigate(['/login']).then(() => {
      window.location.reload();   // Clears any cached state
    });
  }
}

}

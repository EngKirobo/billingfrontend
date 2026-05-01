import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Login } from '../features/auth/login/login';
import { Register } from '../features/auth/register/register';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {

    constructor(private router: Router) {}   // ← Inject Router here

}

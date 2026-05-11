import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';     // ← Import this
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-hostel-dashboard',
  imports: [RouterLink,RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './hostel-dashboard.html',
  styleUrl: './hostel-dashboard.css',
})
export class HostelDashboard {


 menuItems: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
     private router: Router,
     private authService: AuthService
  // ← Inject Router here

  ) {}

  ngOnInit(): void {

    this.menuItems = [
      { label: 'Prices', route: 'prices' },
      { label: 'Intakes', route: 'intakes' },
      { label: 'Hostels', route: 'hostels' },
      { label: 'Hostel Details', route: 'hosteldetails' },
      { label: 'ViewRooms', route: 'assignrooms' },
      { label: 'Allocate Rooms', route: 'roomsintake' },
      { label: 'Add Bed to Rooms', route: 'rooms' },
      { label: 'Hostel Bookings', route: 'hostelbookings' },
      { label: 'Booking', route: 'bookinghoste' },
      { label: 'Hostel Payments', route: 'hostelpays' },
      { label: 'Book Payments', route: 'bookpays' },
      { label: 'Automation', route: 'automation' },
      { label: 'Students', route: 'students' },
      { label: 'Programs', route: 'programs' },
      { label: 'Departments', route: 'departments' }
    ];

    // Refresh UI
    this.cdr.detectChanges();
  }


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

mobileMenuOpen = false;
}

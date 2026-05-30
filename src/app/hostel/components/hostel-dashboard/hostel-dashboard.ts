import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-hostel-dashboard',
  imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './hostel-dashboard.html',
  styleUrl: './hostel-dashboard.css',
})
export class HostelDashboard {

  menuItems: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Prices', route: 'prices' },
      { label: 'Intakes', route: 'intakes' },
      {
        label: 'Hostel',
        expanded: false,
        children: [
          { label: 'Hostels', route: 'hostels' },
          { label: 'Hostel Details', route: 'hosteldetails' },
          { label: 'View Rooms', route: 'assignrooms' },
          { label: 'Allocate Rooms', route: 'roomsintake' },
          { label: 'Add Bed to Rooms', route: 'rooms' }
        ]
      },
      { label: 'Edit Bookings', route: 'hostelbookings' },
      { label: 'Booking', route: 'bookinghoste' },
      { label: 'Hostel Payments', route: 'hostelpays' },
      { label: 'Book Payments', route: 'bookpays' },
      { label: 'Create ControlNo', route: 'ctn' },
      { label: 'Automation', route: 'automation' },

      // External Link - Improved
      {
        label: 'Generate Koz Bills',
        url: 'http://127.0.0.1:8000/api/generate-bills-koz',
        external: true
      },

      { label: 'Register New Student', route: 'entryform' },
      { label: 'Create Control No', route: 'generatebills' },
      { label: 'Students', route: 'students' },
      { label: 'Programs', route: 'programs' },
      { label: 'Departments', route: 'departments' }
    ];

    this.cdr.detectChanges();
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('permissions');
      this.authService.logout();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
  }

  // Improved navigation method
  navigate(item: any): void {
    if (item.url && item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  // Mobile menu
  mobileMenuOpen = false;

  private _errorMessage: string = '';
  get errorMessage(): string {
    return this._errorMessage;
  }
  set errorMessage(value: string) {
    this._errorMessage = value;
    if (value) this.playErrorSound();
  }

  playErrorSound() {
    const audio = new Audio('/src/assets/sound/error.mp3');
    audio.load();
    audio.play().catch(err => console.log('Audio playback blocked:', err));
  }
}

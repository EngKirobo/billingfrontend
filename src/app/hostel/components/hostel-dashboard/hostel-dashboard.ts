import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hostel-dashboard',
  imports: [RouterLink,RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './hostel-dashboard.html',
  styleUrl: './hostel-dashboard.css',
})
export class HostelDashboard {


 menuItems: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.menuItems = [
      { label: 'Prices', route: 'prices' },
      { label: 'Intakes', route: 'intakes' },
      { label: 'Hostels', route: 'hostels' },
      { label: 'Hostel Details', route: 'hosteldetails' },
      { label: 'Assign Rooms', route: 'assignrooms' },
      { label: 'Hostel Bookings', route: 'hostelbookings' },
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
}

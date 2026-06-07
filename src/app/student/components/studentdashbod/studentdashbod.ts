import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-studentdashbod',
   imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './studentdashbod.html',
  styleUrl: './studentdashbod.css',
})
export class Studentdashbod {

   menuItems: any[] = [];
   isAdmin = false;

    constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void{
    this.menuItems = [

      { label: 'courses', route: 'courses' },
      { label: 'Create New Intake', route: 'courseintake' },
      { label: 'Create bookings', route: 'coursebookings' },
      {label: 'Enroll Students', route:'kozstudents'},
      { label: 'Enter Control Number', route: 'kozpayments' },
      { label: 'payments datails', route: 'kozpaydatails' },


    ];
     this.cdr.detectChanges();
      this.isAdmin =this.authService.isAdmin();

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

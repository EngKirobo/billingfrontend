import { Component } from '@angular/core';
import { ControlNumberService } from '../../../core/services/control-number';

@Component({
  selector: 'app-controlnumber',
  templateUrl: './controlnumber.html'
})
export class ControlNumberComponent {

  isLoading = false;
  result: any;

  constructor(private controlNumberService: ControlNumberService) {}

  generateBills() {
    this.isLoading = true;

    this.controlNumberService.generateControlNumbers().subscribe({
      next: (response) => {
        this.result = response;
        console.log('Control Numbers Generated:', response);
        alert(`Successfully processed ${response.totalProcessed} students!`);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to generate control numbers');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

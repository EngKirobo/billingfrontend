import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-generate-bills',
  imports: [CommonModule, ReactiveFormsModule, RouterLink,RouterOutlet],
  templateUrl: './generate-bills.html',
  styleUrls: ['./generate-bills.css']
})
export class GenerateBillsComponent {

  loading = false;

  response: any = null;

  errorMessage = '';

  apiUrl = 'http://127.0.0.1:8000/api/generate-bills';

  apiUrlkoz = 'http://127.0.0.1:8000/api/generate-bills-koz';

  constructor(private http: HttpClient,
              private cdr:ChangeDetectorRef
  ) {}

  generateBills(): void {

  this.loading = true;

  this.http.get(this.apiUrl).subscribe({

    next: (res: any) => {

      this.loading = false;


      // ADD CONTROL NUMBER EXTRACTION
      res.results.forEach((item: any) => {
        this.cdr.detectChanges();

        const bankText =
          item.bill_details?.['1._via_bank'] || '';

        const match =
          bankText.match(/Reference Number:\s*(\d+)/i);

        item.controlNumber =
          match ? match[1] : 'N/A';

      });

      this.response = res;
      this.cdr.detectChanges();

    },

    error: (err) => {

      this.loading = false;

      this.errorMessage =
        err?.error?.message ||
        'Failed to generate bills';

    }

  });

}


 generateBillskoz(): void {

  this.loading = true;

  this.http.get(this.apiUrlkoz).subscribe({

    next: (res: any) => {

      this.loading = false;


      // ADD CONTROL NUMBER EXTRACTION
      res.results.forEach((item: any) => {
        this.cdr.detectChanges();

        const bankText =
          item.bill_details?.['1._via_bank'] || '';

        const match =
          bankText.match(/Reference Number:\s*(\d+)/i);

        item.controlNumber =
          match ? match[1] : 'N/A';

      });

      this.response = res;
      this.cdr.detectChanges();

    },

    error: (err) => {

      this.loading = false;

      this.errorMessage =
        err?.error?.message ||
        'Failed to generate bills';

    }

  });

}

}

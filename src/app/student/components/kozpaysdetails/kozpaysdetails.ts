import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { KozpaysdetailsService }
from '../../services/kozpaysdetails';

import { Kozpaysdetails } from '../../interfaces/kozpaysdetails';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-kozpaysdetails',
  imports: [CommonModule,ReactiveFormsModule, FormsModule,HttpClientModule],
  templateUrl: './kozpaysdetails.html',
  styleUrls: ['./kozpaysdetails.css']
})
export class KozpaysdetailsComponent
implements OnInit {

  records: Kozpaysdetails[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private kozpaysdetailsService: KozpaysdetailsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadData(); }

  // ================= LOAD DATA =================
  loadData(): void {

    this.loading = true;
    this.cdr.detectChanges();
    this.errorMessage = '';



    this.kozpaysdetailsService
      .getAll()
      .subscribe({

        next: (response) => {

          this.records = response;
          this.cdr.detectChanges();


          this.loading = false;

        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }
}

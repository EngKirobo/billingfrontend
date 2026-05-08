import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { BookpayService, BookPay } from '../../services/bookpay';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutomationService } from '../../services/automation';


@Component({
  selector: 'app-bookpay',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './bookpay.html',
  styleUrls: ['./bookpay.css']
})
export class BookpayComponent implements OnInit {

  records: BookPay[] = [];

  constructor(private service: BookpayService,
              private cdr: ChangeDetectorRef,
              private automationService: AutomationService
  ) {}

  ngOnInit(): void {
    this.loadData();

        // Trigger automation automatically
    this.automationService.runAutomation().subscribe({
      next: (res) => {
        console.log('Automation completed:', res);
      },
      error: (err) => {
        console.error('Automation failed:', err);
      }
    });
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.records = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

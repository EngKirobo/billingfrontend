import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price';
import { Price } from '../../interfaces/price';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-price',
  imports: [CommonModule, RouterOutlet, RouterOutlet, ReactiveFormsModule],
  styleUrl:'./price.css',
  templateUrl: './price.html'
})
export class PriceComponent implements OnInit {

  prices: Price[] = [];
  form!: FormGroup;

  isEdit = false;
  selectedId!: number;

  constructor(
    private priceService: PriceService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPrices();
    //  this.cdr.detectChanges();
    this.form = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // loadPrices() {
  //   this.priceService.getAll().subscribe({
  //     next: (data) => this.prices = data,
  //     error: (err) => console.error(err),


  //   });
  // }

  loadPrices() {
  this.priceService.getAll().subscribe({
    next: (data) => {
      this.prices = data;

      this.cdr.detectChanges(); // 👈 force UI update
    },
    error: (err) => console.error(err)
  });
}

  submit() {
    if (this.form.invalid) return;

    if (this.isEdit) {
      this.priceService.update(this.selectedId, this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadPrices();
        });
    } else {
      this.priceService.create(this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadPrices();
        });
    }
  }

  edit(price: Price) {
    this.isEdit = true;
    this.selectedId = price.id!;
    this.form.patchValue({
      amount: price.amount
    });
  }

  delete(id: number) {
    if (!confirm('Delete this price?')) return;

    this.priceService.delete(id).subscribe(() => {
      this.loadPrices();
    });
  }

  reset() {
    this.form.reset({ amount: 0 });
    this.isEdit = false;
  }
}

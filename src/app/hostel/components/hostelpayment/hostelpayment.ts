import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../services/hostelpayment';
import { Payment } from '../../interfaces/hostelpayment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports:[ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './hostelpayment.html',
  styleUrl:'./hostelpayment.css'
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];
  form!: FormGroup;

  isEditing = false;
  selectedId!: number;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.load();
  }

  initForm() {
    this.form = this.fb.group({
      hostelbookingId: [null, Validators.required],
      controlNumber: ['', Validators.required],
      //  paymentDate: [new Date().toISOString(), Validators.required],
      // paymentDate: ['', Validators.required],
      // status: [false]
    });
  }

  // ✅ LOAD
  load() {
    this.paymentService.getAll().subscribe({
      next: (data) => {this.payments = data;
                        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ✅ SAVE
  save() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditing) {
      this.paymentService.update(this.selectedId, formValue).subscribe({
        next: () => this.afterSave('Updated successfully'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.paymentService.create(formValue).subscribe({
        next: () => this.afterSave('Created successfully'),
        error: (err) => this.handleError(err)
      });
    }
  }

  // ✅ EDIT
  edit(p: Payment) {
    this.isEditing = true;
    this.selectedId = p.id!;
    this.form.patchValue(p);
  }

  // ✅ DELETE
  delete(id: number) {
    if (confirm('Delete payment?')) {
      this.paymentService.delete(id).subscribe(() => this.load());
    }
  }

  // ✅ AFTER SAVE
  afterSave(msg: string) {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 3000);

    this.form.reset({ status: false });
    this.isEditing = false;
    this.load();
  }

  // ✅ ERROR HANDLER
  handleError(err: any) {
    console.error(err);

    if (err.error?.message) {
      this.errorMessage = err.error.message;
    } else if (err.status === 401) {
      this.errorMessage = 'Unauthorized. Please login again.';
    } else {
      this.errorMessage = 'Something went wrong.';
    }
  }
}

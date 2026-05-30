import { KozpaymentRequest, KozpaymentResponse } from './../../interfaces/kozpayment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { KozpaymentService } from '../../services/kozpayment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kozpayment',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './kozpayment.html',
  styleUrl: './kozpayment.css',
})
export class KozpaymentComponent {

kozpayments:KozpaymentResponse[]=[];
kozForm!: FormGroup;
  editingId: number | null = null;

  loading = false;

  constructor(
   private fb: FormBuilder,
   private kozpaymentService: KozpaymentService,
   private cdr: ChangeDetectorRef
  ){}


   ngOnInit(): void {

    this.kozForm = this.fb.group({

      coursebookingId: ['',Validators.required],
      controlNumber: ['', Validators.required],
      paymentDate: [],
      status: [false],
      payerName: [false]


     });

     this.loadKozpayments();

  }

  loadKozpayments(): void{ this.loading = true;
    this.cdr.detectChanges();

    this.kozpaymentService
      .getAllKozpayments()
      .subscribe({

        next: (response) => {

          this.kozpayments = response;
          this.cdr.detectChanges();

          this.loading = false;
        },

        error: (error) => {

          console.log(error);

          this.loading = false;
        }
      });
  }

// ================= SAVE =================
  saveBooking(): void {

    if (this.kozForm.invalid) {
      return;
    }

    const payload: KozpaymentRequest = {

      coursebookingId: this.kozForm.value.coursebookingId,

      controlNumber: this.kozForm.value.controlNumber,

      paymentDate: this.kozForm.value.paymentDate,

      payerName: this.kozForm.value.payerName,

      status: this.kozForm.value.status
    };

    // UPDATE
    if (this.editingId !== null) {

      this.kozpaymentService
        .updateKozpayment(
          this.editingId,
          payload
        )
        .subscribe({

          next: () => {

            this.loadKozpayments();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });

    } else {

      // CREATE
      this.kozpaymentService
        .createKozpayment(payload)
        .subscribe({

          next: () => {

            this.loadKozpayments();

            this.resetForm();
          },

          error: (error) => {
            console.log(error);
          }
        });
    }
  }



    // ================= EDIT =================
    editBooking(
      booking: KozpaymentResponse
    ): void {

      this.editingId = booking.id;

      this.kozForm.patchValue({

        coursebookingId: booking.coursebookingId,

        controlNumber: booking.controlNumber,

        paymentDate: booking.paymentDate,

        status: booking.status

      });
    }

    // ================= DELETE =================
    deleteBooking(id: number): void {

      const confirmDelete = confirm(
        'Are you sure you want to delete this booking?'
      );

      if (!confirmDelete) {
        return;
      }

      this.kozpaymentService
        .deleteKozpayment(id)
        .subscribe({

          next: () => {

            this.loadKozpayments();
          },

          error: (error) => {
            console.log(error);
          }
        });
    }

  // ================= RESET =================
  resetForm(): void {

    this.kozForm.reset({
      paymentDate: [false],
      status: [false],
      payerName: [false]

    });

    this.editingId = null;
  }




}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-intake',
//   imports: [],
//   templateUrl: './intake.html',
//   styleUrl: './intake.css',
// })
// export class Intake {}

import { ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { IntakeService } from '../../services/intake';
import { Intake } from '../../interfaces/intake';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-intake',
  imports:[CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule],
  styleUrl:'./intake.css',
  templateUrl: './intake.html'
})
export class IntakeComponent implements OnInit {

  intakes: Intake[] = [];
  form!: FormGroup;

  isEdit = false;
  selectedId!: number;

  constructor(
    private intakeService: IntakeService,
    private fb: FormBuilder,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadIntakes();

    this.form = this.fb.group({
      intake: [null, [Validators.required, Validators.min(1)]]
    });
  }

  // loadIntakes() {
  //   this.intakeService.getAll().subscribe({
  //     next: (data) => this.intakes = data,
  //     error: (err) => console.error(err)
  //   });
  // }

  loadIntakes() {
    this.intakeService.getAll().subscribe({
      next: (data) => {
        this.intakes = data;

        this.cdr.detectChanges(); // 👈 force UI update
      },
      error: (err) => console.error(err)
    });
  }

  submit() {
    if (this.form.invalid) return;

    if (this.isEdit) {
      this.intakeService.update(this.selectedId, this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadIntakes();
        });
    } else {
      this.intakeService.create(this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadIntakes();
        });
    }
  }

  edit(intake: Intake) {
    this.isEdit = true;
    this.selectedId = intake.id!;
    this.form.patchValue({
      intake: intake.intake
    });
  }

  delete(id: number) {
    // if (!confirm('Delete this intake?')) return;

    // this.intakeService.delete(id).subscribe(() => {
    //   this.loadIntakes();
    // });
  }

  reset() {
    this.form.reset();
    this.isEdit = false;
  }
}

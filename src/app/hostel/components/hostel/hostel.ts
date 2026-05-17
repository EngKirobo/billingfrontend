import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HostelService } from '../../services/hostel';
import { Hostel } from '../../interfaces/hostel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hostel',
  imports:[ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './hostel.html',
  styleUrl:'./hostel.css'
})
export class HostelComponent implements OnInit {

  hostels: Hostel[] = [];
  form!: FormGroup;

  isEdit = false;
  selectedId!: number;

  constructor(
    private hostelService: HostelService,
    private fb: FormBuilder,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHostels();

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      capacity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // loadHostels() {
  //   this.hostelService.getAll().subscribe({
  //     next: (data) => this.hostels = data,
  //     error: (err) => console.error(err)
  //   });
  // }

    loadHostels() {
    this.hostelService.getAll().subscribe({
      next: (data) => {
        this.hostels = data;

        this.cdr.detectChanges(); // 👈 force UI update
      },
      error: (err) => console.error(err)
    });
   }

  submit() {
    if (this.form.invalid) return;

    if (this.isEdit) {
      this.hostelService.update(this.selectedId, this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadHostels();
        });
    } else {
      this.hostelService.create(this.form.value)
        .subscribe(() => {
          this.reset();
          this.loadHostels();
        });
    }
  }

  edit(h: Hostel) {
    this.isEdit = true;
    this.selectedId = h.id!;
    this.form.patchValue(h);
  }

  delete(id: number) {
    // if (!confirm('Delete this hostel?')) return;

    // this.hostelService.delete(id).subscribe(() => {
    //   this.loadHostels();
    // });
  }

  reset() {
    this.form.reset({ capacity: 0 });
    this.isEdit = false;
  }
}

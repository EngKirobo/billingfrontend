import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HostelDetailService } from '../../services/hosteldetail';
import { HostelDetail } from '../../interfaces/hosteldetail';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntakeService } from '../../services/intake';
import { Intake } from '../../interfaces/intake';

@Component({
  selector: 'app-hosteldetail',
  standalone: true, // Assuming standalone based on imports array
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hosteldetail.html',
  styleUrl: 'hosteldetail.css',
})
export class HostelDetailComponent implements OnInit {
  details: HostelDetail[] = [];
  form!: FormGroup;
  intakes: Intake[] = [];
  isEdit = false;
  selectedId!: number;

  private STORAGE_KEY = 'hosteldetail_form';

  constructor(
    private service: HostelDetailService,
    private fb: FormBuilder,
    private intakeService: IntakeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadIntakes();

this.form = this.fb.group({
  hostelId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
  name: ['', Validators.required],
  levelId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
  intakeId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
  genderId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
});

    // ✅ Load saved values immediately
    this.loadSavedForm();

    // ✅ Watch changes and save to LocalStorage
    this.form.valueChanges.subscribe(value => {
      // We store everything except the 'name' as per your requirement
      const { name, ...rest } = value;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rest));
    });
  }

loadSavedForm() {
  const saved = localStorage.getItem(this.STORAGE_KEY);
  if (saved) {
    const data = JSON.parse(saved);

    this.form.patchValue({
      hostelId: data.hostelId ? Number(data.hostelId) : null,
      levelId: data.levelId ? Number(data.levelId) : null,
      intakeId: data.intakeId ? Number(data.intakeId) : null,
      genderId: data.genderId ? Number(data.genderId) : null,
      name: null
    }, { emitEvent: false });
  }
}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    if (this.isEdit) {
      this.service.update(this.selectedId, payload).subscribe(() => {
        this.completeAction();
      });
    } else {
      this.service.create(payload).subscribe(() => {
        this.completeAction();
      });
    }
  }

  // Helper to clean up after success
  completeAction() {
    // localStorage.removeItem(this.STORAGE_KEY);
    //this.reset();

    this.load();
     window.location.reload();
  }

  reset() {
    this.form.reset();
    this.isEdit = false;
    // Also clear the storage when manually resetting
    //localStorage.removeItem(this.STORAGE_KEY);
  }

  // ... load(), loadIntakes(), edit(), delete() remain the same
  loadIntakes() {
    this.intakeService.getAll().subscribe({
      next: (data) => {
        this.intakes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        this.details = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  edit(d: HostelDetail) {
    this.isEdit = true;
    this.selectedId = d.id!;
    this.form.patchValue(d);
  }

  delete(id: number) {
    if (!confirm('Delete this record?')) return;
    this.service.delete(id).subscribe(() => {
      this.load();
    });
  }
}

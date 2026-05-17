import { EduLevel } from './../../interfaces/edulevel';
import { EduLevelService } from './../../services/edulevel';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HostelDetailService } from '../../services/hosteldetail';
import { HostelDetail,HostelDetailRequest } from '../../interfaces/hosteldetail';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntakeService } from '../../services/intake';
import { Intake } from '../../interfaces/intake';
import { Hostel } from '../../interfaces/hostel';
import { HostelService } from '../../services/hostel';
import { GenderService } from '../../services/gender';
import { Gender } from '../../interfaces/gender';



@Component({
  selector: 'app-hosteldetail',
  standalone: true, // Assuming standalone based on imports array
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './roomstointake.html',
  styleUrl: 'roomstointake.css',
})
export class RoomstointakeComponent implements OnInit {

  details: HostelDetail[] = [];
  filteredDetails: HostelDetail[] = [];
  // ✅ Store selected row IDs
  selectedRows: number[] = [];
  form!: FormGroup;
  intakes: Intake[] = [];
  hostels: Hostel[] = [];
  isEdit = false;
  selectedId!: number;
  genders: Gender[] = [];
  loading = false;
  edulevels:EduLevel[]=[];
  eduloading=false;

  private STORAGE_KEY = 'hosteldetail_form';

  constructor(
    private service: HostelDetailService,
    private fb: FormBuilder,
    private hostelService: HostelService,
    private intakeService: IntakeService,
    private genderService: GenderService,
    private edulevelService:EduLevelService,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadIntakes();
    this.loadHostels();
    this.loadedulevels();
    this.loadGenders();

    this.form = this.fb.group({
      hostelId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      // name: ['', Validators.required],
      levelId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      intakeId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      // genderId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });

        // ✅ Auto filter when hostel changes
    this.form.get('hostelId')?.valueChanges.subscribe(() => {
      this.applyFilter();
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

  const payload: HostelDetailRequest = {
    hostelId: this.form.value.hostelId,
    levelId: this.form.value.levelId,
    intakeId: this.form.value.intakeId,
    genderId: this.form.value.genderId || null,   // in case it's not in form
    name: this.form.value.name || ''              // if name is needed
  };

  if (this.isEdit) {
    this.service.update(this.selectedId, payload).subscribe({
      next: () => this.completeAction(),
      error: (err) => console.error('Update failed', err)
    });
  } else {
    this.service.create(payload).subscribe({
      next: () => this.completeAction(),
      error: (err) => console.error('Create failed', err)
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

    loadHostels() {
    this.hostelService.getAll().subscribe({
      next: (data) => {
        this.hostels = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadGenders(): void {
    this.loading = true;
    this.genderService.getAll().subscribe({
      next: (data) => {
        this.genders = data;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

    loadedulevels(): void {
    this.eduloading = true;
    this.edulevelService.getAll().subscribe({
      next: (data) => {
        this.edulevels = data;
        this.eduloading = false;
      },
      error: (err) => {
        console.error(err);
        this.eduloading = false;
      }
    });
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => {
        this.details = data;
      // ✅ default table data
      this.filteredDetails = data;

      this.applyFilter();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

applyFilter() {

  const hostelId = this.form?.get('hostelId')?.value;

  // ✅ if no hostel selected show all
  if (!hostelId) {
    this.filteredDetails = this.details;
    return;
  }

  // ✅ filter by hostelId
  this.filteredDetails = this.details.filter(
    d => d.hostelId === hostelId
  );
}

  edit(d: HostelDetail) {
    this.isEdit = true;
    this.selectedId = d.id!;
    this.form.patchValue(d);
  }

  delete(id: number) {
    // if (!confirm('Delete this record?')) return;
    // this.service.delete(id).subscribe(() => {
    //   this.load();
    // });
  }

  getIntakeValue(id: number | null | undefined): number | string {
    const found = this.intakes.find(i => i.id === id);
    return found ? found.intake : 'N/A';
  }

    getGenderValue(id: number | null | undefined): number | string {
    const found = this.genders.find(i => i.id === id);
    return found ? found.gender : 'N/A';
  }


    getEdulelValue(id: number | null | undefined): number | string {
    const found = this.edulevels.find(i => i.id === id);
    return found ? found.eduLevel : 'N/A';
  }

    getHostelValue(id: number | null | undefined): number | string {
    const found = this.hostels.find(i => i.id === id);
    return found ? found.name : 'N/A';
  }


      // ✅ Select / Unselect one row
    toggleSelection(id: number) {

      if (this.selectedRows.includes(id)) {

        this.selectedRows = this.selectedRows.filter(x => x !== id);

      } else {

        this.selectedRows.push(id);

      }
    }

    // ✅ Select All / Unselect All
    toggleAll(event: any) {

      if (event.target.checked) {

        this.selectedRows = this.filteredDetails
          .map(d => d.id!)
          .filter(id => id !== undefined);

      } else {

        this.selectedRows = [];

      }
    }

        // ✅ Check if all selected
    isAllSelected(): boolean {

      return this.filteredDetails.length > 0 &&
            this.selectedRows.length === this.filteredDetails.length;

    }

    isSelected(id: number): boolean {

      return this.selectedRows.includes(id);

    }


    updating = false;
// ==================== BULK UPDATE INTAKE ====================
  bulkUpdateIntake(event: Event): void {
    this.bulkUpdateField(event, 'intakeId');
  }

  // ==================== BULK UPDATE ENTRY LEVEL ====================
  bulkUpdateLevel(event: Event): void {
    this.bulkUpdateField(event, 'levelId');
  }

  // ==================== Generic Bulk Update Method ====================
  private bulkUpdateField(event: Event, field: 'intakeId' | 'levelId'): void {
    const select = event.target as HTMLSelectElement;
    const newValue = Number(select.value);

    if (!newValue) return;
    if (this.selectedRows.length === 0) {
      alert("Please select at least one row first.");
      select.value = '';
      return;
    }

    this.updating = true;
    const selectedDetails = this.details.filter(d => this.selectedRows.includes(d.id!));
    let successCount = 0;
    let errorCount = 0;

    const requests = selectedDetails.map(d => {
      const payload: HostelDetailRequest = {
        hostelId: d.hostelId,
        levelId: field === 'levelId' ? newValue : d.levelId,
        intakeId: field === 'intakeId' ? newValue : d.intakeId,
        genderId: d.genderId,
        name: d.name
      };

      return this.service.update(d.id!, payload).toPromise()
        .then(() => successCount++)
        .catch(() => errorCount++);
    });

    Promise.all(requests)
      .then(() => {
        if (errorCount === 0) {
          alert(`Successfully updated ${successCount} room(s)!`);

        } else {
          alert(`Updated ${successCount} room(s). ${errorCount} failed.`);
        }
        // this.load();
        this.completeAction();
        this.selectedRows = [];
      })
      .catch(err => console.error(err))
      .finally(() => {
        this.updating = false;
        select.value = '';
      });
  }


}

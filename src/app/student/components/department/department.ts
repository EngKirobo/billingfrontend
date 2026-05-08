import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule,FormGroup, Validators } from '@angular/forms';

import { DepartmentService } from '../../services/department';
import { Department, DepartmentRequest } from '../../interfaces/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './department.html',
  styleUrls: ['./department.css']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  form!: FormGroup;

  isEditing = false;
  selectedId!: number;

  successMessage = '';
  searchText = '';

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
                      private cdr: ChangeDetectorRef,

  ) {}

  ngOnInit(): void {
    this.load();

    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  // ✅ Load all
  load() {
    this.departmentService.getAll().subscribe({
      next: (data) => {this.departments = data;
                      this.cdr.detectChanges();},
      error: (err) => console.error(err)
    });
  }

  // ✅ Save (Create or Update)
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: DepartmentRequest = this.form.value;

    if (this.isEditing) {
      this.departmentService.update(this.selectedId, payload).subscribe({
        next: () => this.afterSave('Department updated successfully'),
        error: (err) => console.error(err)
      });
    } else {
      this.departmentService.create(payload).subscribe({
        next: () => this.afterSave('Department created successfully'),
        error: (err) => console.error(err)
      });
    }
  }

  // ✅ After Save
  afterSave(message: string) {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000);

    this.form.reset();
    this.isEditing = false;
    this.selectedId = undefined!;
    this.load();
  }

  // ✅ Edit
  edit(d: Department) {
    this.isEditing = true;
    this.selectedId = d.id!;

    this.form.patchValue({
      name: d.name
    });
  }

  // ✅ Delete
  delete(id: number) {
    if (confirm('Delete department?')) {
      this.departmentService.delete(id).subscribe({
        next: () => this.load(),
        error: (err) => console.error(err)
      });
    }
  }

  // ✅ Clear form
  clear() {
    this.form.reset();
    this.isEditing = false;
  }

  // ✅ Search filter
  get filteredDepartments() {
    return this.departments.filter(d =>
      d.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

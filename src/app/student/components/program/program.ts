import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProgramService } from '../../services/program';
import { Program, ProgramRequest } from '../../interfaces/program';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './program.html',
  styleUrls: ['./program.css']
})
export class ProgramComponent implements OnInit {

  programs: Program[] = [];
  form!: FormGroup;

  isEditing = false;
  selectedId!: number;

  successMessage = '';

  constructor(
    private programService: ProgramService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();

    this.form = this.fb.group({
      name: ['', Validators.required],
      deptId: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  // ✅ Load all
  load() {
    this.programService.getAll().subscribe({
      next: (data) => {this.programs = data;
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

    const payload: ProgramRequest = this.form.value;

    if (this.isEditing) {
      this.programService.update(this.selectedId, payload).subscribe({
        next: () => this.afterSave('Program updated successfully'),
        error: (err) => console.error(err)
      });
    } else {
      this.programService.create(payload).subscribe({
        next: () => this.afterSave('Program created successfully'),
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
  edit(p: Program) {
    this.isEditing = true;
    this.selectedId = p.id!;

    this.form.patchValue({
      name: p.name,
      deptId: p.deptId
    });
  }

  // ✅ Delete
  delete(id: number) {
    // if (confirm('Delete program?')) {
    //   this.programService.delete(id).subscribe({
    //     next: () => this.load(),
    //     error: (err) => console.error(err)
    //   });
    // }
  }

  // ✅ Clear form manually
  clear() {
    this.form.reset();
    this.isEditing = false;
  }
}

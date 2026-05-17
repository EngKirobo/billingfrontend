import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { RoomService } from '../../services/room';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './room.html',
  styleUrl: './room.css'
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  form!: FormGroup;

  isEditing = false;
  selectedId!: number;

  successMessage = '';
  errorMessage = '';

  constructor(
    private roomService: RoomService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadRooms();

    this.form = this.fb.group({

      hdetailsId: [null, Validators.required],
      bedId: [null, Validators.required],
      priceId: [null, Validators.required]

    });
  }

  loadRooms() {

    this.roomService.getAll().subscribe({

      next: (data) => {

        this.rooms = data;
        this.cdr.detectChanges();
      },

      error: (err) => console.error(err)

    });
  }

  save() {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEditing && this.selectedId) {

      this.roomService.update(
        this.selectedId,
        formValue
      ).subscribe({

        next: () => {

          this.afterSave(
            'Room updated successfully!'
          );
        },

        error: (err) => {

          console.error(err);

          this.errorMessage =
            'Failed to update room';
        }
      });

    } else {

      this.roomService.create(formValue).subscribe({

        next: () => {

          this.afterSave(
            'Room created successfully!'
          );
        },

        error: (err) => {

          console.error(err);

          this.errorMessage =
            'Failed to create room';
        }
      });
    }
  }

  afterSave(message: string) {

    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = '';
    }, 4000);

    this.resetForm();

    this.loadRooms();
  }

  edit(room: Room) {

    this.selectedId = room.id!;
    this.isEditing = true;

    this.form.patchValue({

      hdetailsId: room.hdetailsId,
      bedId: room.bedId,
      priceId: room.priceId

    });
  }

  delete(id: number) {

    // if (confirm('Delete room?')) {

    //   this.roomService.delete(id).subscribe({

    //     next: () => {

    //       this.loadRooms();
    //     },

    //     error: (err) => {

    //       console.error(err);

    //       this.errorMessage =
    //         'Failed to delete room';
    //     }
    //   });
    // }
  }

  resetForm() {

    this.form.reset();

    this.isEditing = false;
    this.selectedId = undefined!;
  }
}

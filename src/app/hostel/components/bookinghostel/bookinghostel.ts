
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HostelBookingService } from '../../services/hostelbooking';
import { HostelBooking } from '../../interfaces/hostelbooking';
import { StudentService } from '../../../student/services/student';
import { Student } from '../../../student/interfaces/student';
import { HostelDetailService } from '../../../hostel/services/hosteldetail';
import { HostelDetail } from '../../../hostel/interfaces/hosteldetail';
import { Room } from '../../../hostel/interfaces/room';
import { RoomService } from '../../../hostel/services/room';

@Component({
   selector: 'app-hostelbooking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './bookinghostel.html',
  styleUrl: './bookinghostel.css',
})
export class Bookinghostel implements OnInit {

  bookings: HostelBooking[] = [];
  form!: FormGroup;
  isEditing = false;
  selectedId!: number;

  successMessage = '';

  students: Student[] = [];
  searchTerm: string = '';
  filteredStudentsList: Student[] = [];
  hostelDetails: HostelDetail[] = [];
matchedHostelDetails: HostelDetail[] = [];
rooms: Room[] = [];

  constructor(
    private bookingService: HostelBookingService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private studentService: StudentService,
    private hostelDetailService: HostelDetailService,
    private roomService: RoomService

  ) {}

  ngOnInit(): void {
    this.loadBookings();
     this.loadStudents();
     this.loadHostelDetails();
     this.loadRooms();

    this.form = this.fb.group({
      roomId: [null, Validators.required],
      studentId: [null, Validators.required],
        academicYear: ['2026/2027'],
        semester: ['I'],
      // academicYear: ['', Validators.required],
      // semester: ['', Validators.required],
      verified: [false],
      allowed: [false]
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


getRoomsByHostelDetail(hostelDetailId: number): Room[] {

  return this.rooms.filter(
    r => r.hdetailsId === hostelDetailId
  );
}
// getRoomId(hostelDetailId: number): number | string {

//   const room = this.rooms.find(
//     r => r.hdetailsId === hostelDetailId
//   );

//   return room ? room.id! : 'N/A';
// }

getRoomIds(hostelDetailId: number): string {

  const matchedRooms = this.rooms.filter(
    r => r.hdetailsId === hostelDetailId
  );

  if (matchedRooms.length === 0) {
    return 'N/A';
  }

  return matchedRooms
    .map(r => r.id)
    .join(', ');
}

  loadHostelDetails() {
  this.hostelDetailService.getAll().subscribe({
    next: (data) => {
      this.hostelDetails = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}

  loadBookings() {
    this.bookingService.getAll().subscribe({
      next: (data) => {
        this.bookings = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadStudents() {
  this.studentService.getAll().subscribe({
    next: (data) => {
      this.students = data;
      this.filteredStudentsList = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err)
  });
}

filterStudents() {
  if (!this.searchTerm.trim()) {
    this.filteredStudentsList = this.students;
    this.cdr.detectChanges();
    return;
  }

  const term = this.searchTerm.toLowerCase();


  this.filteredStudentsList = this.students.filter(s =>
    s.name?.toLowerCase().includes(term) ||
    s.admino?.toLowerCase().includes(term) ||
    s.email?.toLowerCase().includes(term) ||
    s.country?.toLowerCase().includes(term) ||
    s.telephone?.toLowerCase().includes(term)
  );
}

// selectStudent(student: Student) {

//   this.form.patchValue({
//     studentId: student.id
//   });

//   // optional:
//   this.searchTerm = student.name;

//   // optional:
//   this.filteredStudentsList = [];
// }

errorMessage = '';
selectStudent(student: Student) {


  // CHECK IF STUDENT IS ALREADY BOOKED
  const existingBooking = this.bookings.find(
    b => b.studentId === student.id
  );

  // IF FOUND
  if (existingBooking) {

    this.errorMessage =
      `${student.name} is already booked for hostel.`;

    this.successMessage = '';

    // CLEAR MATCHED ROOMS
    this.matchedHostelDetails = [];

    return;
  }

  // CLEAR OLD ERROR
  this.errorMessage = '';

  // SET FORM VALUE
  this.form.patchValue({
    studentId: student.id
  });

  // FIND MATCHING HOSTEL DETAILS
  this.matchedHostelDetails = this.hostelDetails.filter(h =>

    h.genderId === student.genderId &&
    h.levelId === student.entryId &&
    h.intakeId === student.intakeId

  );

  console.log('Matched Hostel Details:', this.matchedHostelDetails);

  // OPTIONAL UI UPDATES
  this.searchTerm = student.name;
  this.filteredStudentsList = [];

  this.cdr.detectChanges();
}

afterSave(message: string) {
  this.successMessage = message;

  // auto hide success
  setTimeout(() => this.successMessage = '', 4000);

  this.form.reset();
  this.isEditing = false;
  this.selectedId = undefined!;

  this.loadBookings();
}


  edit(booking: HostelBooking) {
    this.selectedId = booking.id!;
    this.isEditing = true;
    this.form.patchValue(booking);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.delete(id).subscribe(() => this.loadBookings());
    }
  }

  // Add these properties
currentPage = 1;
itemsPerPage = 10;

get paginatedBookings() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.bookings.slice(start, start + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.bookings.length / this.itemsPerPage);
}

get startIndex(): number {
  return (this.currentPage - 1) * this.itemsPerPage;
}

get endIndex(): number {
  return Math.min(this.currentPage * this.itemsPerPage, this.bookings.length);
}

prevPage() {
  if (this.currentPage > 1) this.currentPage--;
}

nextPage() {
  if (this.currentPage < this.totalPages) this.currentPage++;
}

resetForm() {
  this.form.reset({
    verified: false,
    allowed: false
  });
  this.isEditing = false;
  this.selectedId = undefined!;
}

getAvailableRoomsByHostelDetail(hostelDetailId: number): Room[] {

  return this.rooms.filter(room => {

    // ROOM MUST MATCH HOSTEL DETAIL
    const matchesHostel =
      room.hdetailsId === hostelDetailId;

    if (!matchesHostel) {
      return false;
    }

    // CHECK IF ROOM IS BOOKED
    const booking = this.bookings.find(
      b => b.roomId === room.id
    );

    // ROOM IS AVAILABLE IF:
    // 1. NO BOOKING EXISTS
    // OR
    // 2. studentId IS NULL

    return !booking || booking.studentId == null;

  });
}

}

export interface HostelBooking {
  id?: number;
  roomId: number;
  studentId: number;
  academicYear: string;
  semester: string;
  verified?: boolean;
  allowed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelDetail {
  id?: number;
  hostelId: number;
  name: string;
  levelId: number;
  intakeId: number;
  genderId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelDetailRequest {
  hostel_id: number;
  name: string;
  level_id: number;
  intake_id: number;
  gender_id: number;
}

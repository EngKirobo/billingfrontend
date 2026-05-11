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
  hostelId: number;
  name: string;
  levelId: number;
  intakeId: number;
  genderId: number;
}

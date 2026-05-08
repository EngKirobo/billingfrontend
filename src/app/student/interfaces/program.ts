export interface Program {
  id?: number;
  name: string;
  deptId: number | null;
  createdAt?: string;   // LocalDateTime → string
  updatedAt?: string;
}

export interface ProgramRequest {
  name: string;
  deptId: number | null;
}

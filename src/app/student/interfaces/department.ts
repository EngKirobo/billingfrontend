export interface Department {
  id?: number;
  name: string;
  createdAt?: string;   // LocalDateTime → string (ISO format)
  updatedAt?: string;
}

export interface DepartmentRequest {
  name: string;
}

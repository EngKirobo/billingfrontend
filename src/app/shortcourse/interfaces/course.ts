export interface CourseResponseDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  deptId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseRequestDTO {
  name: string;
  description: string;
  price: number;
  deptId: number;
}

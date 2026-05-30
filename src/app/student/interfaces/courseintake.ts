export interface CourseintakeRequest {
  courseId: number;
}

export interface CourseintakeResponse {
  id: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
}

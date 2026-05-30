export interface CourseBookingRequestDTO {

  intakeId: number;

  studId: number;

  verified: boolean;

  allowed: boolean;

  ctn: boolean;
}

export interface CourseBookingResponseDTO {

  id: number;

  intakeId: number;

  studId: number;

  verified: boolean;

  allowed: boolean;

  ctn: boolean;

  createdAt: string;

  updatedAt: string;
}

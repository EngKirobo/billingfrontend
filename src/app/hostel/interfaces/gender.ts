export interface Gender {
  id?: number;           // Integer in backend → number in Angular
  gender: string;
  createdAt?: string;    // LocalDateTime serialized as string
  updatedAt?: string;
}

export interface Hostel {
  id?: number;
  name: string;
  description: string;
  location?: string;
  capacity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelRequest {
  name: string;
  description: string;
  location?: string;
  capacity: number;
}

export interface Price {
  id?: number;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PriceRequest {
  amount: number;
}

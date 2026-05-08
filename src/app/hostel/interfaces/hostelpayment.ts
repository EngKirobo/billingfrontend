export interface Payment {
  id?: number;
  hostelbookingId: number;
  controlNumber: string;
  paymentDate: string; // LocalDateTime → ISO string
  status: boolean;
}

export interface PaymentRequest {
  hostelbookingId: number;
  controlNumber: string;
  paymentDate: string;
  status: boolean;
}

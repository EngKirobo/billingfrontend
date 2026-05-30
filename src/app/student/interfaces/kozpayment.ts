export interface KozpaymentRequest {

   coursebookingId: number;
   controlNumber: string;
   paymentDate: string;
   status: boolean;
   payerName: string;
}

export interface KozpaymentResponse {

   id: number;
   coursebookingId: number;
   controlNumber: string;
   paymentDate: string;
   status: boolean;
   payerName: string;
   createdAt: string;
   updatedAt: string;

  }

export interface Room {
  id?: number;
  hdetailsId: number;
  bedId: number;
  priceId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomRequest {
  hdetailsId: number;
  bedId: number;
  priceId: number;
}

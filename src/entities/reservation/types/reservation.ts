

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";



export interface Reservation {

  id:string;

  tableId:string;

  customerId:string | null;

  orderId:string | null;


  status:ReservationStatus;


  createdAt:string;

}



export interface ReservationState {

  reservations: Record<string, Reservation>;

}

export interface Notification {
  id:string;
  customerId: string;
  title:string;
  message:string;
  type:
      | "info"
      | "success"
      | "warning"
      | "error";

  read:boolean;
  createdAt:string;

}



export interface NotificationState {

  byCustomer:
    Record<
      string,
      Notification[]
    >;

}
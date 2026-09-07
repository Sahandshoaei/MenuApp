import type { CartItem } from "../../cart/types/cart";


export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "served"
  | "cancelled";

  
export interface OrderState {

  loading: boolean;
  success: boolean;
  entities: Record<string, Order>;
  currentOrderByCustomer: Record<
      string,
      string | null
    >;
  historyByCustomer: Record<
      string,
      string[]
    >;
}

export interface OrderItem {
    id:string;
    menuItemId:string;
    name:string;
    price:number;
    quantity:number;
}




export interface Order {

  id:string;
  customerId:string;
  /*
   * میز انتخاب شده توسط مشتری
   */
  tableId:string;
  items:OrderItem[];
  totalPrice:number;
  status:OrderStatus;
  createdAt:string;
}

export interface SubmitOrder {

    customerId:string;
    order:{
          tableId:string;
          items:OrderItem[];
          totalPrice:number;
          status:OrderStatus;
        };

}

// Order سند اصلی اتفاق است.

// مثلاً:

// Order #1001

// Customer:
// Ali

// Table:
// 5

// Items:
// Pizza
// Drink

// Status:
// Preparing
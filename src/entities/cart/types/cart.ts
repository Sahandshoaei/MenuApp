
import type { MenuItem } from "../../menu/types/menu-item";

export interface CartItem extends MenuItem {
  quantity: number;
  note?: string;
}

export interface CartState {
  items: CartItem[];
}
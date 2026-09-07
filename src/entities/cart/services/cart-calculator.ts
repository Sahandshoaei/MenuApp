import type { CartItem } from "../types/cart";

export const calculateCartCount = (
  items: CartItem[],
): number => {
  return items.reduce(
    (total, item) =>
      total + item.quantity,
    0,
  );
};

export const calculateCartTotal = (
  items: CartItem[],
): number => {
  return items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );
};

export const isCartEmpty = (
  items: CartItem[],
): boolean => {
  return items.length === 0;
};
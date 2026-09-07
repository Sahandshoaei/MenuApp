import type { CartItem } from "../types/cart";

const STORAGE_KEY = "cart";

export const loadCart = (): CartItem[] => {
  const data =
    localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as CartItem[];
  } catch {
    return [];
  }
};

export const saveCart = (
  items: CartItem[],
): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items),
  );
};

export const clearCartStorage = (): void => {
  localStorage.removeItem(
    STORAGE_KEY,
  );
};
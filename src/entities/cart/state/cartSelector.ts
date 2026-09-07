
import type { RootState } from "@/app/store";

import {
  calculateCartCount,
  calculateCartTotal,
  isCartEmpty,
} from "../services/cart-calculator";

/* ---------------- Items ---------------- */

export const selectCartItems = (
  state: RootState,
) => state.cart.items;

/* ---------------- Count ---------------- */

export const selectCartCount = (
  state: RootState,
) =>
  calculateCartCount(
    state.cart.items,
  );

/* ---------------- Total ---------------- */

export const selectCartTotal = (
  state: RootState,
) =>
  calculateCartTotal(
    state.cart.items,
  );

/* ---------------- Empty ---------------- */

export const selectCartIsEmpty = (
  state: RootState,
) =>
  isCartEmpty(
    state.cart.items,
  );
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { MenuItem } from "../../../entities/menu/types/menu-item";
import {loadCart} from "../services/cart-storage";
import type {CartItem,CartState} from "../types/cart";


const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /* ---------------- Add ---------------- */

    addToCart: (
      state,
      action: PayloadAction<MenuItem>,
    ) => {
      const existingItem =
        state.items.find(
          (item) =>
            item.id === action.payload.id,
        );

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      const cartItem: CartItem = {
        ...action.payload,
        quantity: 1,
      };

      state.items.push(cartItem);
    },

    /* ---------------- Remove ---------------- */

    remove: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload,
      );
    },

    /* ---------------- Increase ---------------- */

    increase: (
      state,
      action: PayloadAction<string>,
    ) => {
      const item =
        state.items.find(
          (item) =>
            item.id === action.payload,
        );

      if (!item) return;

      item.quantity += 1;
    },

    /* ---------------- Decrease ---------------- */

    decrease: (
      state,
      action: PayloadAction<string>,
    ) => {
      const item =
        state.items.find(
          (item) =>
            item.id === action.payload,
        );

      if (!item) return;

      if (item.quantity <= 1) {
        state.items =
          state.items.filter(
            (currentItem) =>
              currentItem.id !== item.id,
          );

        return;
      }

      item.quantity -= 1;
    },

    /* ---------------- Clear ---------------- */

    clear: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  remove,
  increase,
  decrease,
  clear,
} = cartSlice.actions;

export const cartReducer =
  cartSlice.reducer;

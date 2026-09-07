import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { FavoriteState } from "../types/favorite-state";
import { saveFavorites , loadFavorites } from "../services/favorite-storage";

interface FavoritePayload {
  customerId: string;
  menuItemId: string;
}


const initialState: FavoriteState = {
  byCustomer: loadFavorites(),
};

const favoriteSlice = createSlice({
  name: "favorite",

  initialState,

  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<FavoritePayload>
    ) => {
      const {
        customerId,
        menuItemId,
      } = action.payload;

      if (!state.byCustomer[customerId]) {
        state.byCustomer[customerId] = [];
      }

      const favorites =
        state.byCustomer[customerId];

      if (!favorites.includes(menuItemId)) {
        favorites.push(menuItemId);
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<FavoritePayload>
    ) => {
      const {
        customerId,
        menuItemId,
      } = action.payload;

      if (!state.byCustomer[customerId]) {
        return;
      }

      state.byCustomer[customerId] =
        state.byCustomer[
          customerId
        ].filter(
          (id) => id !== menuItemId
        );
    },

    toggleFavorite: (
      state,
      action: PayloadAction<FavoritePayload>
    ) => {
      const {
        customerId,
        menuItemId,
      } = action.payload;

      if (!state.byCustomer[customerId]) {
        state.byCustomer[customerId] = [];
      }

      const favorites =
        state.byCustomer[customerId];

      const exists =
        favorites.includes(menuItemId);

      if (exists) {
        state.byCustomer[customerId] =
          favorites.filter(
            (id) => id !== menuItemId
          );
      } else {
        favorites.push(menuItemId);
      }
      saveFavorites(state.byCustomer);
    },

    clearFavorites: (
      state,
      action: PayloadAction<string>
    ) => {
      state.byCustomer[action.payload] =[];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoriteSlice.actions;


export const favoriteReducer = favoriteSlice.reducer;
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/types";
import { selectActiveCustomerId } from "../../customer/state/customerSelector";

/* ---------------- Favorite Ids ---------------- */

export const selectFavoriteIds = createSelector(
  [
    (state: RootState) => state.favorites.byCustomer,
    selectActiveCustomerId,
  ],
  (byCustomer, customerId): string[] => {
    if (!customerId) {
      return [];
    }

    return byCustomer[customerId] ?? [];
  }
);

/* ---------------- Favorite Count ---------------- */

export const selectFavoriteCount = createSelector(
  [selectFavoriteIds],
  (favoriteIds) => favoriteIds.length
);

/* ---------------- Is Favorite ---------------- */

export const selectFavorite =
  (menuItemId: string) =>
    createSelector(
      [selectFavoriteIds],
      (favoriteIds) =>
        favoriteIds.includes(menuItemId)
    );
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/index";

/* ---------------- Base ---------------- */

export const selectMenuItemsMap = (state: RootState) => state.menu.items;
export const selectCategoriesMap = (state: RootState) => state.menu.categories;
export const selectHighlights = (state: RootState) => state.menu.highlights;

/* ---------------- Derived ---------------- */

export const selectAllMenuItems = createSelector(
  selectMenuItemsMap,
  (items) => Object.values(items)
);

export const selectAllCategories = createSelector(
  selectCategoriesMap,
  (categories) => Object.values(categories)
);

export const selectMenuItemById = (id: string) => (state: RootState) =>
  state.menu.items[id];

export const selectCategoryById = (id: string) => (state: RootState) =>
  state.menu.categories[id];

export const selectMenuItemsByCategory = (categoryId: string) =>
  createSelector(selectAllMenuItems, (items) =>
    items.filter((item) => item.category === categoryId)
  );

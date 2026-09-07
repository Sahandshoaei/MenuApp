import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import { menuItems as seedMenuItems } from "../constants/menu-items";
import { categories as seedCategories } from "../constants/categories";
import { menuHighlights as seedHighlights } from "../constants/hilights";
import type { MenuItem } from "../types/menu-item";
import type { Category } from "../types/category";
import type { MenuHighlights } from "../types/hilights";

export interface MenuState {
  items: Record<string, MenuItem>;
  categories: Record<string, Category>;
  highlights: MenuHighlights;
}

/* -------------------------------------------------------------------------- */
/*                                LocalStorage                                */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "menu";

const buildSeedState = (): MenuState => {
  const items: Record<string, MenuItem> = {};
  seedMenuItems.forEach((item) => {
    items[item.id] = item;
  });

  const categories: Record<string, Category> = {};
  seedCategories.forEach((category) => {
    categories[category.id] = category;
  });

  return { items, categories, highlights: { ...seedHighlights } };
};

const loadMenu = (): MenuState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return buildSeedState();

    const parsed = JSON.parse(data) as Partial<MenuState>;

    return {
      items: parsed.items ?? buildSeedState().items,
      categories: parsed.categories ?? buildSeedState().categories,
      highlights: parsed.highlights ?? buildSeedState().highlights,
    };
  } catch {
    return buildSeedState();
  }
};

// current(state) یک snapshot عادی (غیر-Immer-draft) از state می‌سازه
// تا بشه با خیال راحت JSON.stringify کرد.
const persist = (state: MenuState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current(state)));
};

const generateId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const initialState: MenuState = loadMenu();

const menuSlice = createSlice({
  name: "menu",

  initialState,

  reducers: {
    addMenuItem: {
      prepare: (payload: Omit<MenuItem, "id">) => ({
        payload: { ...payload, id: generateId("item") } as MenuItem,
      }),

      reducer: (state, action: PayloadAction<MenuItem>) => {
        state.items[action.payload.id] = action.payload;
        persist(state);
      },
    },

    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      if (!state.items[action.payload.id]) return;

      state.items[action.payload.id] = action.payload;
      persist(state);
    },

    removeMenuItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      persist(state);
    },

    addCategory: {
      prepare: (payload: Omit<Category, "id">) => ({
        payload: { ...payload, id: generateId("cat") } as Category,
      }),

      reducer: (state, action: PayloadAction<Category>) => {
        state.categories[action.payload.id] = action.payload;
        persist(state);
      },
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      if (!state.categories[action.payload.id]) return;

      state.categories[action.payload.id] = action.payload;
      persist(state);
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;

      const hasItems = Object.values(state.items).some(
        (item) => item.category === categoryId
      );

      // گارد: دسته‌بندی‌ای که آیتم داره یا دسته‌بندی ویژه‌ست حذف نمی‌شه
      if (hasItems) return;
      if (state.highlights.featuredCategoryId === categoryId) return;

      delete state.categories[categoryId];
      persist(state);
    },

    updateHighlights: (state, action: PayloadAction<Partial<MenuHighlights>>) => {
      state.highlights = { ...state.highlights, ...action.payload };
      persist(state);
    },
  },
});

export const {
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
  addCategory,
  updateCategory,
  removeCategory,
  updateHighlights,
} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;

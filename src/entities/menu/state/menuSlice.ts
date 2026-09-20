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

/** Coerce legacy persisted icons (components / empty objects) back to strings */
const sanitizeCategory = (raw: Partial<Category>, fallback?: Category): Category => {
  const id = raw.id ?? fallback?.id ?? "unknown";
  const title = raw.title ?? fallback?.title ?? "Category";

  let icon = fallback?.icon ?? "🍽️";
  if (typeof raw.icon === "string" && raw.icon.trim()) {
    icon = raw.icon;
  }

  return {
    id,
    title,
    icon,
    glowColor: raw.glowColor ?? fallback?.glowColor,
    gradient: raw.gradient ?? fallback?.gradient,
  };
};

const loadMenu = (): MenuState => {
  const seed = buildSeedState();

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return seed;

    const parsed = JSON.parse(data) as Partial<MenuState>;

    const categories: Record<string, Category> = {};
    const rawCategories = parsed.categories ?? {};

    Object.entries(rawCategories).forEach(([id, raw]) => {
      categories[id] = sanitizeCategory(
        { ...(raw as Partial<Category>), id },
        seed.categories[id]
      );
    });

    // If storage had no categories, use seed
    if (Object.keys(categories).length === 0) {
      Object.assign(categories, seed.categories);
    }

    // Ensure known seed categories keep a valid emoji if storage wiped icon
    Object.entries(seed.categories).forEach(([id, seedCat]) => {
      if (!categories[id]) {
        categories[id] = seedCat;
        return;
      }
      if (typeof categories[id].icon !== "string" || !categories[id].icon) {
        categories[id] = { ...categories[id], icon: seedCat.icon };
      }
    });

    const next: MenuState = {
      items: parsed.items ?? seed.items,
      categories,
      highlights: parsed.highlights ?? seed.highlights,
    };

    // Rewrite storage so next boot is clean (fixes legacy component icons)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }

    return next;
  } catch {
    return seed;
  }
};

const persist = (state: MenuState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current(state)));
};

const generateId = (prefix: string) =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

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
        payload: {
          ...payload,
          icon:
            typeof payload.icon === "string" && payload.icon.trim()
              ? payload.icon
              : "🍽️",
          id: generateId("cat"),
        } as Category,
      }),

      reducer: (state, action: PayloadAction<Category>) => {
        state.categories[action.payload.id] = action.payload;
        persist(state);
      },
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      if (!state.categories[action.payload.id]) return;

      const next = sanitizeCategory(action.payload, state.categories[action.payload.id]);
      state.categories[action.payload.id] = next;
      persist(state);
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;

      const hasItems = Object.values(state.items).some(
        (item) => item.category === categoryId
      );

      if (hasItems) return;
      if (state.highlights.featuredCategoryId === categoryId) return;

      delete state.categories[categoryId];
      persist(state);
    },

    updateHighlights: (
      state,
      action: PayloadAction<Partial<MenuHighlights>>
    ) => {
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

import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { RestaurantSettings } from "../types/restaurant";

export interface RestaurantState {
  settings: RestaurantSettings;
}

const STORAGE_KEY = "restaurant";

const DEFAULT_SETTINGS: RestaurantSettings = {
  orderingEnabled: true,
};

const loadSettings = (): RestaurantSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_SETTINGS;

    return { ...DEFAULT_SETTINGS, ...(JSON.parse(data) as Partial<RestaurantSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

const persist = (state: RestaurantState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current(state).settings));
};

const initialState: RestaurantState = { settings: loadSettings() };

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setOrderingEnabled: (state, action: PayloadAction<boolean>) => {
      state.settings.orderingEnabled = action.payload;
      persist(state);
    },
  },
});

export const { setOrderingEnabled } = restaurantSlice.actions;
export const restaurantReducer = restaurantSlice.reducer;

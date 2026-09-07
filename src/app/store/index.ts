import { configureStore } from "@reduxjs/toolkit";
import { env } from "../config/env";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: env.isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
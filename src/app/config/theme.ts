export type ThemeMode = "light" | "dark";

export const themeConfig = {
  defaultTheme: "light" as ThemeMode,
  storageKey: "theme",
} as const;

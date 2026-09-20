import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themeConfig, type ThemeMode } from "../config/theme";
import { STORAGE_KEYS } from "../config/storage";

type ThemeContextValue = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return themeConfig.defaultTheme;

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }

  // Respect OS preference on first visit
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return themeConfig.defaultTheme;
}

function applyThemeClass(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const initial = readStoredTheme();
    // Apply before paint when possible (also set in index.html boot script ideally)
    if (typeof document !== "undefined") applyThemeClass(initial);
    return initial;
  });

  useEffect(() => {
    applyThemeClass(theme);
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // Sync if OS preference changes and user hasn't explicitly chosen? keep stored override.
  // Optional: listen storage from other tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEYS.theme) return;
      if (e.newValue === "light" || e.newValue === "dark") {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

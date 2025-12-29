// src/theme/ThemeProvider.tsx
import { createContext, useEffect, useMemo, useState } from "react";
import {
  type ThemeMode,
  getDocumentTheme,
  initTheme,
  setDocumentTheme,
  setStoredTheme,
  toggleTheme,
} from "./theme";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // SSR 고려: document 없으면 기본값
    if (typeof document === "undefined") return defaultTheme;
    return getDocumentTheme();
  });

  useEffect(() => {
    // 앱 시작 시 stored값 → html data-theme 반영
    if (typeof document === "undefined") return;
    const t = initTheme(defaultTheme);
    setThemeState(t);
  }, [defaultTheme]);

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
    setDocumentTheme(next);
    setStoredTheme(next);
  };

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      setTheme,
      toggle: () => setThemeState(toggleTheme(theme)),
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// src/theme/theme.ts
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "ds-theme";

function isThemeMode(v: any): v is ThemeMode {
  return v === "light" || v === "dark";
}

export function getDocumentTheme(): ThemeMode {
  const v = document.documentElement.dataset.theme;
  return isThemeMode(v) ? v : "light";
}

export function setDocumentTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}

export function getStoredTheme(): ThemeMode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isThemeMode(v) ? v : null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: ThemeMode) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

export function initTheme(fallback: ThemeMode = "light"): ThemeMode {
  const stored = getStoredTheme();
  const theme = stored ?? fallback;
  setDocumentTheme(theme);
  return theme;
}

export function toggleTheme(current?: ThemeMode): ThemeMode {
  const now = current ?? getDocumentTheme();
  const next: ThemeMode = now === "dark" ? "light" : "dark";
  setDocumentTheme(next);
  setStoredTheme(next);
  return next;
}

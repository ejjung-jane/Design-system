// src/components/ThemeToggle/ThemeToggle.tsx
import styles from "./ThemeToggle.module.css";
import { useTheme } from "../../theme/useTheme";

export interface ThemeToggleProps {
  className?: string;
  label?: string;
}

export function ThemeToggle({ className, label = "테마" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      className={[styles.btn, className ?? ""].filter(Boolean).join(" ")}
      onClick={toggle}
      aria-label={`${label} 전환`}
      aria-pressed={theme === "dark"}
    >
      <span className={styles.text}>{label}</span>
      <span className={styles.state}>{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

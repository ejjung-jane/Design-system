import type { ReactNode } from "react";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  fullWidth?: boolean;
  invalid?: boolean;

  prefix?: ReactNode;
  suffix?: ReactNode;

  clearable?: boolean; // X 버튼 표시
  onClear?: () => void;
}

export function Input({
  size = "md",
  fullWidth = false,
  invalid = false,
  disabled,

  prefix,
  suffix,
  clearable = false,
  onClear,

  value,
  defaultValue,

  ...props
}: InputProps) {
  const hasValue =
    typeof value === "string"
      ? value.length > 0
      : typeof defaultValue === "string"
      ? defaultValue.length > 0
      : false;

  const showClear = clearable && !!onClear && hasValue && !disabled;

  const wrapCls = [
    styles.wrap,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    invalid ? styles.invalid : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapCls}>
      {prefix ? <span className={styles.affix}>{prefix}</span> : null}

      <input
        className={styles.input}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />

      {showClear ? (
        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
          aria-label="Clear"
        >
          ×
        </button>
      ) : null}

      {suffix ? <span className={styles.affix}>{suffix}</span> : null}
    </div>
  );
}

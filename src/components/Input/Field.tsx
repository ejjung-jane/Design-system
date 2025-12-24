import styles from "./Field.module.css";
import { Input } from "./Input";
import type { InputProps } from "./Input";

export interface FieldProps extends Omit<InputProps, "invalid"> {
  label?: string;
  requiredMark?: boolean; // 라벨 옆 * 표시
  helperText?: string;
  errorText?: string;
}

export function Field({
  label,
  requiredMark = false,
  helperText,
  errorText,
  id,
  fullWidth = true,
  disabled,
  ...inputProps
}: FieldProps) {
  // id 없으면 label htmlFor 연결을 위해 간단 생성
  const inputId = id ?? `field-${Math.random().toString(36).slice(2, 9)}`;

  const describedById =
    helperText || errorText ? `${inputId}-desc` : undefined;

  const showError = Boolean(errorText);
  const showHelper = Boolean(helperText) && !showError;

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {requiredMark ? <span className={styles.required}> *</span> : null}
        </label>
      )}

      <Input
        {...inputProps}
        id={inputId}
        fullWidth={fullWidth}
        disabled={disabled}
        invalid={showError}
        aria-describedby={describedById}
      />

      {(showHelper || showError) && (
        <p
          id={describedById}
          className={`${styles.message} ${
            showError ? styles.error : styles.helper
          }`}
        >
          {showError ? errorText : helperText}
        </p>
      )}
    </div>
  );
}

import { useId } from "react";
import styles from "./Field.module.css";
import { Input } from "./Input";
import type { InputProps } from "./Input";

export interface FieldProps extends Omit<InputProps, "invalid"> {
  label?: string;
  requiredMark?: boolean;
  helperText?: string;
  errorText?: string;

  layout?: "vertical" | "horizontal";
  labelWidth?: number | string; // 예: 120, "140px"
}

export function Field({
  label,
  requiredMark = false,
  helperText,
  errorText,
  id,
  fullWidth = true,
  disabled,

  layout = "vertical",
  labelWidth = 120,

  ...inputProps
}: FieldProps) {
  const reactId = useId();
  const inputId = id ?? `field-${reactId}`;

  const describedById =
    helperText || errorText ? `${inputId}-desc` : undefined;

  const showError = Boolean(errorText);
  const showHelper = Boolean(helperText) && !showError;

  const isHorizontal = layout === "horizontal";

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}>
      <div
        className={`${styles.row} ${isHorizontal ? styles.horizontal : styles.vertical}`}
      >
        {label && (
          <label
            className={`${styles.label} ${isHorizontal ? styles.labelH : ""}`}
            htmlFor={inputId}
            style={isHorizontal ? { width: labelWidth } : undefined}
          >
            {label}
            {requiredMark ? <span className={styles.required}> *</span> : null}
          </label>
        )}

        <div className={styles.control}>
          <Input
            {...inputProps}
            id={inputId}
            fullWidth={true}
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
      </div>
    </div>
  );
}

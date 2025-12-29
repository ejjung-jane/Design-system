import { useId } from "react";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  label?: string;
  requiredMark?: boolean;
  helperText?: string;
  errorText?: string;

  layout?: "vertical" | "horizontal";
  labelWidth?: number | string;

  fullWidth?: boolean;

  /** 실제 컨트롤(Input/Select 등)을 렌더링 */
  children: (args: {
    id: string;
    describedBy?: string;
    invalid: boolean;
  }) => React.ReactNode;
}

export function FormField({
  label,
  requiredMark = false,
  helperText,
  errorText,

  layout = "vertical",
  labelWidth = 120,

  fullWidth = true,
  children,
}: FormFieldProps) {
  const uid = useId();
  const id = `ff-${uid}`;

  const helpId = helperText ? `${id}-help` : undefined;
  const errorId = errorText ? `${id}-error` : undefined;

  const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

  const invalid = Boolean(errorText);
  const showHelper = Boolean(helperText) && !invalid;

  const isHorizontal = layout === "horizontal";

  return (
    <div className={`${styles.field} ${fullWidth ? styles.fullWidth : ""}`}>
      <div className={`${styles.row} ${isHorizontal ? styles.horizontal : styles.vertical}`}>
        {label && (
          <label
            className={`${styles.label} ${isHorizontal ? styles.labelH : ""}`}
            htmlFor={id}
            style={isHorizontal ? { width: labelWidth } : undefined}
          >
            {label}
            {requiredMark ? <span className={styles.required}> *</span> : null}
          </label>
        )}

        <div className={styles.control}>
          {children({ id, describedBy, invalid })}

          {invalid ? (
            <p id={errorId} className={`${styles.message} ${styles.error}`} role="alert">
              {errorText}
            </p>
          ) : showHelper ? (
            <p id={helpId} className={`${styles.message} ${styles.helper}`}>
              {helperText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

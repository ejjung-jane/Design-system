import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode; // 옵션: 체크박스 아래 설명
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { id, className, label, description, indeterminate, disabled, ...rest },
    ref
  ) {
    return (
      <label
        className={[
          styles.root,
          disabled ? styles.disabled : "",
          className ?? "",
        ].join(" ")}
        data-disabled={disabled ? "true" : "false"}
      >
        <span className={styles.control}>
          <input
            {...rest}
            id={id}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className={styles.input}
            aria-checked={
              indeterminate ? "mixed" : rest.checked ? "true" : "false"
            }
          />
          <span
            className={styles.box}
            data-indeterminate={indeterminate ? "true" : "false"}
            aria-hidden="true"
          />
        </span>

        {(label || description) && (
          <span className={styles.text}>
            {label && <span className={styles.label}>{label}</span>}
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </span>
        )}
      </label>
    );
  }
);

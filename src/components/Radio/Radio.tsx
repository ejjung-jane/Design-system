import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Radio.module.css";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, className, label, description, disabled, ...rest },
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
          type="radio"
          disabled={disabled}
          className={styles.input}
        />
        <span className={styles.circle} aria-hidden="true" />
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
});

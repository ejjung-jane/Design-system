// src/components/Radio/Radio.tsx
import { forwardRef, useId, useMemo } from "react";
import styles from "./Radio.module.css";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: RadioSize;
  label?: React.ReactNode;
  labelPlacement?: "right" | "left";
  invalid?: boolean;
  description?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      className,
      size = "md",
      label,
      labelPlacement = "right",
      invalid = false,
      description,
      disabled,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `rdo-${autoId}`;

    const rootClass = useMemo(() => {
      return [
        styles.root,
        styles[`size-${size}`],
        invalid ? styles.invalid : "",
        disabled ? styles.disabled : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ");
    }, [className, size, invalid, disabled]);

    const control = (
      <span className={styles.control} aria-hidden="true">
        <span className={styles.dot} />
      </span>
    );

    const content =
      label || description ? (
        <span className={styles.content}>
          {label ? <span className={styles.label}>{label}</span> : null}
          {description ? <span className={styles.description}>{description}</span> : null}
        </span>
      ) : null;

    return (
      <label className={rootClass} htmlFor={inputId}>
        {labelPlacement === "left" ? content : null}

        {control}
        <input
          {...rest}
          id={inputId}
          ref={ref}
          className={styles.input}
          type="radio"
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />

        {labelPlacement === "right" ? content : null}
      </label>
    );
  }
);

Radio.displayName = "Radio";

// src/components/Radio/RadioGroup.tsx
import { useId } from "react";
import styles from "./RadioGroup.module.css";
import { Radio, type RadioSize } from "./Radio";

export type RadioGroupOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: React.ReactNode;
};

export interface RadioGroupProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;

  options: RadioGroupOption[];

  /** controlled */
  value: string | undefined;
  onValueChange: (next: string) => void;

  name?: string;
  disabled?: boolean;
  size?: RadioSize;
  direction?: "vertical" | "horizontal";
  invalid?: boolean;

  className?: string;
}

export function RadioGroup({
  label,
  description,
  error,
  options,
  value,
  onValueChange,
  name,
  disabled = false,
  size = "md",
  direction = "vertical",
  invalid,
  className,
}: RadioGroupProps) {
  const autoId = useId();
  const groupId = `rdogrp-${autoId}`;
  const hintId = description ? `${groupId}-desc` : undefined;
  const errorId = error ? `${groupId}-err` : undefined;

  const rootClass = [
    styles.root,
    styles[`dir-${direction}`],
    (invalid || !!error) ? styles.invalid : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {label ? <div className={styles.label}>{label}</div> : null}
      {description ? (
        <div id={hintId} className={styles.description}>
          {description}
        </div>
      ) : null}

      <div
        className={styles.list}
        role="radiogroup"
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={(invalid || !!error) || undefined}
      >
        {options.map((opt) => {
          const optDisabled = disabled || !!opt.disabled;
          return (
            <Radio
              key={opt.value}
              name={name}
              size={size}
              value={opt.value}
              checked={value === opt.value}
              disabled={optDisabled}
              invalid={invalid || !!error}
              label={opt.label}
              description={opt.description}
              onChange={() => onValueChange(opt.value)}
            />
          );
        })}
      </div>

      {error ? (
        <div id={errorId} className={styles.error}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

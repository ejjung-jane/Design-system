// src/components/Checkbox/CheckboxGroup.tsx
import { useId, useMemo } from "react";
import styles from "./CheckboxGroup.module.css";
import { Checkbox, type CheckboxSize } from "./Checkbox";

export type CheckboxGroupOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  description?: React.ReactNode;
};

export interface CheckboxGroupProps {
  /** 그룹 라벨 */
  label?: React.ReactNode;

  /** 설명(그룹 단위) */
  description?: React.ReactNode;

  /** 에러 메시지(그룹 단위) */
  error?: React.ReactNode;

  /** 옵션 목록 */
  options: CheckboxGroupOption[];

  /** controlled */
  value?: string[];

  /** uncontrolled */
  defaultValue?: string[];

  /** 값 변경 */
  onValueChange?: (next: string[]) => void;

  /** 전체 disabled */
  disabled?: boolean;

  /** Checkbox size */
  size?: CheckboxSize;

  /** 가로/세로 배치 */
  direction?: "vertical" | "horizontal";

  /** 유효성 스타일 */
  invalid?: boolean;

  /** name (폼 제출용) */
  name?: string;

  className?: string;
}

export function CheckboxGroup({
  label,
  description,
  error,
  options,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  size = "md",
  direction = "vertical",
  invalid,
  name,
  className,
}: CheckboxGroupProps) {
  const autoId = useId();
  const groupId = `chkgrp-${autoId}`;
  const hintId = description ? `${groupId}-desc` : undefined;
  const errorId = error ? `${groupId}-err` : undefined;

  const isControlled = value !== undefined;

  const current = useMemo(() => {
    if (isControlled) return value ?? [];
    return defaultValue ?? [];
  }, [isControlled, value, defaultValue]);

  const setNext = (next: string[]) => {
    onValueChange?.(next);
  };

  const toggle = (v: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...current, v]))
      : current.filter((x) => x !== v);
    setNext(next);
  };

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
      {label ? (
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span className={styles.label}>{label}</span>
          </div>

          {description ? (
            <div id={hintId} className={styles.description}>
              {description}
            </div>
          ) : null}
        </div>
      ) : description ? (
        <div id={hintId} className={styles.description}>
          {description}
        </div>
      ) : null}

      <div
        className={styles.list}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={(invalid || !!error) || undefined}
      >
        {options.map((opt) => {
          const optDisabled = disabled || !!opt.disabled;
          const checked = current.includes(opt.value);

          return (
            <Checkbox
              key={opt.value}
              size={size}
              name={name}
              value={opt.value}
              checked={checked}
              disabled={optDisabled}
              invalid={invalid || !!error}
              label={opt.label}
              description={opt.description}
              onChange={(e) => toggle(opt.value, e.target.checked)}
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

// src/components/Checkbox/Checkbox.tsx
import { forwardRef, useId, useMemo } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;

  /** 라벨(텍스트/노드). 없으면 박스만 렌더링 */
  label?: React.ReactNode;

  /** 라벨 위치 */
  labelPlacement?: "right" | "left";

  /** 에러/검증 상태(스타일용) */
  invalid?: boolean;

  /** 보조문구(옵션) */
  description?: React.ReactNode;

  /** indeterminate 상태 (시각 상태만; checked와 독립) */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      className,
      size = "md",
      label,
      labelPlacement = "right",
      invalid = false,
      description,
      indeterminate = false,
      disabled,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id ?? `chk-${autoId}`;

    const rootClass = useMemo(() => {
      const cls = [
        styles.root,
        styles[`size-${size}`],
        invalid ? styles.invalid : "",
        disabled ? styles.disabled : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ");
      return cls;
    }, [className, size, invalid, disabled]);

    // indeterminate는 input의 DOM property라서 props로만은 안 잡힘.
    // 여기서는 ref가 넘어오든 아니든 안정적으로 적용되게 callback ref 패턴 사용.
    const setRef = (node: HTMLInputElement | null) => {
      if (!node) return;

      // 외부 ref 연결
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;

      node.indeterminate = Boolean(indeterminate);
    };

    const control = (
      <span className={styles.control} aria-hidden="true">
        <span className={styles.indicator} />
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
          ref={setRef}
          className={styles.input}
          type="checkbox"
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />

        {labelPlacement === "right" ? content : null}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

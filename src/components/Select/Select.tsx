import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./Select.module.css";

export type SelectSize = "sm" | "md" | "lg";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface SelectProps {
  options: SelectOption[];

  value?: string;                 // controlled
  defaultValue?: string;          // uncontrolled
  onChange?: (value: string) => void;

  placeholder?: string;

  size?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  invalid?: boolean;

  /** 토큰/아이콘 같은 왼쪽/오른쪽 요소 */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select...",

  size = "md",
  fullWidth = false,
  disabled = false,
  invalid = false,

  prefix,
  suffix,
}: SelectProps) {
  const uid = useId();
  const listboxId = `select-listbox-${uid}`;

  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? "");
  const selectedValue = isControlled ? (value as string) : innerValue;

  const selectedOption = useMemo(
    () => options.find((o) => o.value === selectedValue),
    [options, selectedValue]
  );

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === selectedValue);
    return idx >= 0 ? idx : 0;
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const setValue = (v: string) => {
    if (!isControlled) setInnerValue(v);
    onChange?.(v);
  };

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    const idx = options.findIndex((o) => o.value === selectedValue);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const closeMenu = () => setOpen(false);

  const selectIndex = (idx: number) => {
    const opt = options[idx];
    if (!opt || opt.disabled) return;
    setValue(opt.value);
    closeMenu();
  };

  // outside click close
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) closeMenu();
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // keep active item in view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const wrapCls = [
    styles.wrap,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    invalid ? styles.invalid : "",
    disabled ? styles.disabled : "",
    open ? styles.open : "",
  ]
    .filter(Boolean)
    .join(" ");

  const label = selectedOption?.label ?? "";

  const onTriggerClick = () => {
    if (disabled) return;
    setOpen((v) => !v);
    if (!open) openMenu();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) return openMenu();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) return openMenu();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) return openMenu();
        selectIndex(activeIndex);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
    }
  };

  return (
    <div ref={wrapRef} className={wrapCls}>
      {prefix ? <span className={styles.affix}>{prefix}</span> : null}

      <button
        type="button"
        className={styles.trigger}
        onClick={onTriggerClick}
        onKeyDown={onKeyDown}
        disabled={disabled}
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
      >
        <span className={`${styles.value} ${!label ? styles.placeholder : ""}`}>
          {label || placeholder}
        </span>
        <span className={styles.chev} aria-hidden="true">
          ▾
        </span>
      </button>

      {suffix ? <span className={styles.affix}>{suffix}</span> : null}

      {open ? (
        <ul
          id={listboxId}
          className={styles.list}
          role="listbox"
          ref={listRef}
          tabIndex={-1}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === selectedValue;
            const isActive = idx === activeIndex;
            const liCls = [
              styles.item,
              isSelected ? styles.selected : "",
              isActive ? styles.active : "",
              opt.disabled ? styles.itemDisabled : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                key={opt.value}
                className={liCls}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled || undefined}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()} // 클릭 시 focus 유지
                onClick={() => selectIndex(idx)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

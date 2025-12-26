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

  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  onChange?: (value: string) => void;

  placeholder?: string;

  size?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  invalid?: boolean;

  /** 토큰/아이콘 같은 왼쪽/오른쪽 요소 */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  /** 검색 기능 */
  searchable?: boolean;
  searchPlaceholder?: string;
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

  searchable = false,
  searchPlaceholder = "Search...",
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

  // ✅ search
  const [query, setQuery] = useState("");

  // ✅ filtered options (searchable)
  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

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

  const closeMenu = () => setOpen(false);

  const openMenu = () => {
    if (disabled) return;

    // ✅ 열 때 검색 초기화(원하면 유지하도록 바꿀 수도 있음)
    if (searchable) setQuery("");

    setOpen(true);

    // activeIndex를 "현재 선택값" 기준으로 세팅 (검색 초기화 후 options 기준)
    const idx = options.findIndex((o) => o.value === selectedValue);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const toggleMenu = () => {
    if (disabled) return;
    setOpen((prev) => {
      const next = !prev;
      if (next) openMenu();
      return next;
    });
  };

  const selectIndex = (idx: number) => {
    const opt = filteredOptions[idx];
    if (!opt || opt.disabled) return;
    setValue(opt.value);
    closeMenu();
  };

  // ✅ filteredOptions가 줄어들 때 activeIndex 범위 보정
  useEffect(() => {
    if (!open) return;
    if (filteredOptions.length === 0) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((i) => Math.min(i, filteredOptions.length - 1));
  }, [open, filteredOptions.length]);

  // outside click close
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const root = wrapRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) closeMenu();
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) return openMenu();
        setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
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
          setActiveIndex(Math.max(filteredOptions.length - 1, 0)); // ✅ filtered 기준
        }
        break;
    }
  };

  return (
    <div ref={wrapRef} className={wrapCls}>
      {/* ✅ 트리거 라인: prefix / button / suffix */}
      <div className={styles.controlRow}>
        {prefix ? <span className={styles.affix}>{prefix}</span> : null}

        <button
          type="button"
          className={styles.trigger}
          onClick={toggleMenu}
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
      </div>

      {/* ✅ 드롭다운 패널: controlRow와 레이아웃 분리(옆으로 붙는 문제 원천 차단) */}
      {open ? (
        <div className={styles.dropdown}>
          {searchable && (
            <div className={styles.searchWrap}>
              <input
                className={styles.search}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                // ✅ input에서 방향키/엔터가 wrapper로 올라가 Select 키보드 로직을 방해하지 않게
                onKeyDown={(e) => e.stopPropagation()}
                placeholder={searchPlaceholder}
                autoFocus
              />
            </div>
          )}

          <ul
            id={listboxId}
            className={styles.list}
            role="listbox"
            ref={listRef}
            tabIndex={-1}
          >
            {filteredOptions.length === 0 ? (
              <li className={styles.empty}>No results</li>
            ) : (
              filteredOptions.map((opt, idx) => {
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
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectIndex(idx)}
                  >
                    {opt.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

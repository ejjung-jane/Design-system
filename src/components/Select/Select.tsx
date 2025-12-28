// src/components/Select/Select.tsx
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import styles from "./Select.module.css";

export type SelectSize = "sm" | "md" | "lg";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  options: SelectOption[];

  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  onChange?: (value: string) => void;

  placeholder?: string;

  size?: SelectSize;
  fullWidth?: boolean;
  disabled?: boolean;
  invalid?: boolean;

  /** HTMLAttributes의 prefix와 충돌 방지 */
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  /** 검색 */
  searchable?: boolean;
  searchPlaceholder?: string;

  /** 검색어 초기화 정책 */
  clearQueryOnClose?: boolean;

  /** ✅ 선택값 지우기(×) */
  clearable?: boolean;
  onClear?: () => void;

  /**
   * ✅ 선택값이 짧아져도 wrap이 줄어들지 않게 최소 너비 지정
   * - fullWidth=true면 무시되고 100% 사용
   * - 기본값은 0(지정 안 함)
   */
  minWidth?: number | string;
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

  startAdornment,
  endAdornment,

  searchable = false,
  searchPlaceholder = "Search...",

  clearQueryOnClose = false,

  clearable = false,
  onClear,

  minWidth,

  className,
  ...rest
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
  const [activeIndex, setActiveIndex] = useState(0);

  // search
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, searchable]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const setValue = (v: string) => {
    if (!isControlled) setInnerValue(v);
    onChange?.(v);
  };

  const syncActiveToSelected = (base: SelectOption[]) => {
    const idx = base.findIndex((o) => o.value === selectedValue);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const openMenu = () => {
    if (disabled) return;
    setOpen(true);
    // activeIndex를 "현재 보이는 리스트(filtered)" 기준으로 맞춤
    syncActiveToSelected(filteredOptions.length ? filteredOptions : options);
  };

  const closeMenu = () => {
    setOpen(false);
    if (clearQueryOnClose) setQuery("");
  };

  const selectIndex = (idx: number) => {
    const opt = filteredOptions[idx];
    if (!opt || opt.disabled) return;
    setValue(opt.value);
    closeMenu();
  };

  const clearSelection = () => {
    if (disabled) return;
    setValue("");
    setQuery("");
    onClear?.();
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

  // open 시 검색창 포커스 (searchable일 때)
  useEffect(() => {
    if (!open) return;
    if (searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  // keep active item in view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  // query 변화 시 activeIndex를 0으로 리셋(UX 안정)
  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
  }, [query, open]);

  const wrapCls = [
    styles.wrap,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    invalid ? styles.invalid : "",
    disabled ? styles.disabled : "",
    open ? styles.open : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const label = selectedOption?.label ?? "";
  const hasValue = Boolean(selectedValue);

  const onTriggerClick = () => {
    if (disabled) return;
    setOpen((v) => !v);
    if (!open) openMenu();
  };

  const moveActive = (delta: number) => {
    const len = filteredOptions.length;
    if (len <= 0) return;
    setActiveIndex((i) => {
      const next = i + delta;
      if (next < 0) return 0;
      if (next >= len) return len - 1;
      return next;
    });
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) return openMenu();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) return openMenu();
        moveActive(-1);
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
          setActiveIndex(Math.max(filteredOptions.length - 1, 0));
        }
        break;
    }
  };

  // 검색창에서 ArrowUp/Down/Enter로 옵션 선택 가능하게
  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(-1);
        break;
      case "Enter":
        e.preventDefault();
        selectIndex(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
    }
  };

  // ✅ 값이 짧아져도 wrap이 안 줄어들게: minWidth를 inline-style로 적용
  const wrapStyle =
    !fullWidth && minWidth !== undefined
      ? { minWidth }
      : undefined;

  return (
    <div ref={wrapRef} className={wrapCls} style={wrapStyle} {...rest}>
      {startAdornment ? (
        <span className={styles.affix}>{startAdornment}</span>
      ) : null}

      <button
        type="button"
        className={styles.trigger}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
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

        <span className={styles.actions}>
          {/* ✅ clearable: 선택값 있을 때만 × 표시 */}
          {clearable && !disabled && selectedValue ? (
            <button
              type="button"
              className={styles.clear}
              aria-label="Clear selection"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isControlled) setInnerValue("");
                onChange?.("");
                onClear?.();
              }}
            >
              ×
            </button>
          ) : null}

          <span className={styles.chev} aria-hidden="true">▾</span>
        </span>
      </button>

      {endAdornment ? <span className={styles.affix}>{endAdornment}</span> : null}

      {open ? (
        <div className={styles.dropdown}>
          {searchable && (
            <div className={styles.searchWrap}>
              <input
                ref={searchRef}
                className={styles.search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKeyDown}
                placeholder={searchPlaceholder}
                autoComplete="off"
                spellCheck={false}
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

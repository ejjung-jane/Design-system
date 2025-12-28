// src/components/Modal/Modal.tsx
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;

  footer?: React.ReactNode;

  onClose: () => void;

  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;

  /** 열릴 때 자동 포커스 대상(없으면 모달 컨테이너에 포커스) */
  initialFocusSelector?: string;
};

function getFocusableElements(root: HTMLElement) {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

export function Modal({
  open,
  title,
  children,
  footer,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocusSelector,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // body scroll lock + ESC close + focus trap
  useEffect(() => {
    if (!open) return;

    // 1) 포커스 복귀를 위해 열기 전 active element 저장
    lastActiveRef.current = document.activeElement as HTMLElement | null;

    // 2) body scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 3) initial focus
    const focusModal = () => {
      const root = modalRef.current;
      if (!root) return;

      const target =
        (initialFocusSelector
          ? root.querySelector<HTMLElement>(initialFocusSelector)
          : null) ?? null;

      if (target) {
        target.focus();
        return;
      }

      // 포커스 가능한 요소가 있으면 첫 번째로, 없으면 컨테이너로
      const focusables = getFocusableElements(root);
      (focusables[0] ?? root).focus();
    };

    // 4) keydown 핸들러 (ESC + TAB trap)
    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const root = modalRef.current;
      if (!root) return;

      const focusables = getFocusableElements(root);

      // 포커스 가능한 게 없으면 모달 컨테이너에 고정
      if (focusables.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      // Shift+Tab: first에서 뒤로 가면 last로
      if (e.shiftKey) {
        if (!active || active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      // Tab: last에서 앞으로 가면 first로
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // 렌더 완료 후 포커스
    requestAnimationFrame(focusModal);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);

      // 5) 닫힐 때 원래 포커스로 복귀
      requestAnimationFrame(() => {
        lastActiveRef.current?.focus?.();
      });
    };
  }, [open, closeOnEsc, onClose, initialFocusSelector]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (!closeOnOverlayClick) return;
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        tabIndex={-1} /* 포커스 fallback */
        onMouseDown={(e) => e.stopPropagation()}
      >
        {title ? (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button
              type="button"
              className={styles.close}
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        ) : (
          <div className={styles.headerOnlyClose}>
            <button
              type="button"
              className={styles.close}
              aria-label="Close"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
}

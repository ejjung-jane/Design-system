// src/components/Modal/Modal.tsx
import { useEffect } from "react";
import styles from "./Modal.module.css";

export type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;

  /** 하단 버튼 영역(선택) */
  footer?: React.ReactNode;

  /** 닫기 동작 */
  onClose: () => void;

  /** overlay 클릭 닫기 */
  closeOnOverlayClick?: boolean;

  /** ESC 닫기 */
  closeOnEsc?: boolean;
};

export function Modal({
  open,
  title,
  children,
  footer,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
  // body scroll lock + ESC close
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (!closeOnEsc) return;
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeOnEsc, onClose]);

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
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
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

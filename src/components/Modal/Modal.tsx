import { useEffect, useId } from "react";
import styles from "./Modal.module.css";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;

  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;

  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,

  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,

  className,
  ...rest
}: ModalProps) {
  const uid = useId();
  const titleId = `modal-title-${uid}`;

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const rootCls = [styles.root, className].filter(Boolean).join(" ");
  const panelCls = [styles.panel, styles[size]].filter(Boolean).join(" ");

  return (
    <div className={rootCls} {...rest}>
      <div
        className={styles.overlay}
        onMouseDown={(e) => {
          if (!closeOnOverlayClick) return;
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className={panelCls}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className={styles.header}>
              {title ? (
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              ) : (
                <span />
              )}

              {showCloseButton ? (
                <button
                  type="button"
                  className={styles.close}
                  onClick={onClose}
                  aria-label="Close"
                >
                  ×
                </button>
              ) : null}
            </div>
          )}

          <div className={styles.body}>{children}</div>

          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

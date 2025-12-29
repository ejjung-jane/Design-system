import { forwardRef } from "react";
import styles from "./Textarea.module.css";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: TextareaSize;
  fullWidth?: boolean;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      fullWidth = false,
      invalid = false,
      className,
      ...rest
    },
    ref
  ) => {
    const cls = [
      styles.textarea,
      styles[size],
      fullWidth ? styles.fullWidth : "",
      invalid ? styles.invalid : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return <textarea ref={ref} className={cls} {...rest} />;
  }
);

Textarea.displayName = "Textarea";

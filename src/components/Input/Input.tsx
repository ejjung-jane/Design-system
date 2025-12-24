import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  fullWidth?: boolean;
  invalid?: boolean;
}

export function Input({
  size = "md",
  fullWidth = false,
  invalid = false,
  disabled,
  ...props
}: InputProps) {
  const cls = [
    styles.input,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    invalid ? styles.invalid : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={cls} disabled={disabled} aria-invalid={invalid || undefined} {...props} />;
}

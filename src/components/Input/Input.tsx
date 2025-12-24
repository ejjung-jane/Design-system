import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  fullWidth?: boolean;
  error?: boolean;
}

export function Input({
  size = "md",
  fullWidth = false,
  error = false,
  disabled,
  ...props
}: InputProps) {
  const cls = [
    styles.input,
    styles[size],
    fullWidth ? styles.fullWidth : "",
    error ? styles.error : "",
    disabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={cls} disabled={disabled} {...props} />;
}

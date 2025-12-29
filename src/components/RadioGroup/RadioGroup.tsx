import { useId, type ReactNode } from "react";
import { Radio } from "../Radio/Radio";
import styles from "./RadioGroup.module.css";

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export interface RadioGroupProps {
  name?: string;

  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  onValueChange?: (value: string) => void;

  options: RadioOption[];

  direction?: "vertical" | "horizontal";
  disabled?: boolean;

  /** FormField에서 내려주는 접근성 */
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function RadioGroup({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  direction = "vertical",
  disabled,
  ...a11y
}: RadioGroupProps) {
  const uid = useId();
  const groupName = name ?? `rg-${uid}`;

  const isControlled = value !== undefined;

  return (
    <div
      className={styles.root}
      data-direction={direction}
      role="radiogroup"
      {...a11y}
    >
      {options.map((opt) => {
        const checked = isControlled ? value === opt.value : undefined;
        return (
          <Radio
            key={opt.value}
            name={groupName}
            value={opt.value}
            checked={checked}
            defaultChecked={!isControlled && defaultValue === opt.value}
            disabled={disabled || opt.disabled}
            onChange={(e) => {
              if (!e.target.checked) return;
              onValueChange?.(opt.value);
            }}
            label={opt.label}
            description={opt.description}
          />
        );
      })}
    </div>
  );
}

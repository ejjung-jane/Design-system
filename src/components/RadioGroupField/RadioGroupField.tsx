import { FormField, type FormFieldProps } from "../FormField/FormField";
import { RadioGroup, type RadioGroupProps } from "../RadioGroup/RadioGroup";

export interface RadioGroupFieldProps
  extends Omit<FormFieldProps, "children"> {
  radioGroupProps: Omit<
    RadioGroupProps,
    "aria-describedby" | "aria-invalid"
  >;
}

export function RadioGroupField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth,
  radioGroupProps,
}: RadioGroupFieldProps) {
  return (
    <FormField
      label={label}
      requiredMark={requiredMark}
      helperText={helperText}
      errorText={errorText}
      layout={layout}
      labelWidth={labelWidth}
      fullWidth={fullWidth}
    >
      {({ describedBy, invalid }) => (
        <RadioGroup
          {...(radioGroupProps as any)}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </FormField>
  );
}

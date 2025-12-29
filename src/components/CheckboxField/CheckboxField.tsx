import { FormField, type FormFieldProps } from "../FormField/FormField";
import { Checkbox, type CheckboxProps } from "../Checkbox/Checkbox";

export interface CheckboxFieldProps
  extends Omit<FormFieldProps, "children"> {
  checkboxProps?: Omit<
    CheckboxProps,
    "id" | "aria-describedby" | "aria-invalid"
  >;
}

export function CheckboxField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth,
  checkboxProps,
}: CheckboxFieldProps) {
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
      {({ id, describedBy, invalid }) => (
        <Checkbox
          {...(checkboxProps as any)}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </FormField>
  );
}

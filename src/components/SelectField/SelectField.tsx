import { FormField, type FormFieldProps } from "../FormField/FormField";
import { Select, type SelectProps } from "../Select/Select";

export interface SelectFieldProps
  extends Omit<FormFieldProps, "children"> {
  selectProps: Omit<SelectProps, "id" | "aria-describedby" | "aria-invalid">;
}

export function SelectField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth,
  selectProps,
}: SelectFieldProps) {
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
        <Select
          {...(selectProps as any)}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </FormField>
  );
}

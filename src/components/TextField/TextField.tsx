import { FormField, type FormFieldProps } from "../FormField/FormField";
import { Input, type InputProps } from "../Input/Input";

export interface TextFieldProps
  extends Omit<FormFieldProps, "children"> {
  inputProps?: Omit<InputProps, "id" | "aria-describedby" | "aria-invalid">;
}

export function TextField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth,
  inputProps,
}: TextFieldProps) {
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
        <Input
          {...(inputProps as any)}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </FormField>
  );
}

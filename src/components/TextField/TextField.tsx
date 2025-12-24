import { FormField, FormFieldProps } from "../FormField";
import { Input, InputProps } from "../Input";

export type TextFieldProps = Omit<FormFieldProps, "children"> & InputProps;

export function TextField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth = true,
  ...inputProps
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
          {...inputProps}
          id={id}
          fullWidth={true}
          invalid={invalid}
          aria-describedby={describedBy}
        />
      )}
    </FormField>
  );
}

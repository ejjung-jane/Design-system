import { FormField } from "../FormField";
import type { FormFieldProps } from "../FormField";

import { Select } from "../Select";
import type { SelectProps } from "../Select";

export type SelectFieldProps = Omit<FormFieldProps, "children"> & SelectProps;

export function SelectField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth = true,
  ...selectProps
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
          {...selectProps}
          id={id}
          invalid={invalid}
          fullWidth={fullWidth}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
        />
      )}
    </FormField>
  );
}

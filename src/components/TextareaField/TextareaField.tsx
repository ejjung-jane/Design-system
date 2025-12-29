import { FormField } from "../FormField";
import type { FormFieldProps } from "../FormField";

import { Textarea } from "../Textarea";
import type { TextareaProps } from "../Textarea";

export type TextareaFieldProps = Omit<FormFieldProps, "children"> &
  TextareaProps;

export function TextareaField({
  label,
  requiredMark,
  helperText,
  errorText,
  layout,
  labelWidth,
  fullWidth = true,
  ...textareaProps
}: TextareaFieldProps) {
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
        <Textarea
          {...textareaProps}
          id={id}
          fullWidth
          invalid={invalid}
          aria-describedby={describedBy}
        />
      )}
    </FormField>
  );
}

import { FormField, FormFieldProps } from "../FormField";
import { Select, SelectProps } from "../Select";

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
          // Select는 id가 input처럼 직접 연결되진 않지만,
          // a11y를 위해 aria-describedby/invalid는 내려줌
          invalid={invalid}
          fullWidth={true}
          // @ts-expect-error aria props 허용용(SelectProps에 추가해도 됨)
          aria-describedby={describedBy}
        />
      )}
    </FormField>
  );
}

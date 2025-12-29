import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxField } from "./CheckboxField";

const meta: Meta<typeof CheckboxField> = {
  title: "Components/CheckboxField",
  component: CheckboxField,
};
export default meta;

export const Basic: StoryObj<typeof CheckboxField> = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <CheckboxField
        label="약관 동의"
        helperText="필수 약관에 동의해주세요"
        checkboxProps={{
          checked,
          onChange: (e) => setChecked(e.target.checked),
        }}
      />
    );
  },
};

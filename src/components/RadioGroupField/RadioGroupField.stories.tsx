import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroupField } from "./RadioGroupField";

const meta: Meta<typeof RadioGroupField> = {
  title: "Components/RadioGroupField",
  component: RadioGroupField,
};
export default meta;

export const Basic: StoryObj<typeof RadioGroupField> = {
  render: () => {
    const [value, setValue] = useState("a");

    return (
      <RadioGroupField
        label="옵션 선택"
        helperText="하나를 선택하세요"
        radioGroupProps={{
          value,
          onValueChange: setValue,
          options: [
            { value: "a", label: "옵션 A", description: "설명 A" },
            { value: "b", label: "옵션 B" },
            { value: "c", label: "옵션 C", disabled: true },
          ],
        }}
      />
    );
  },
};

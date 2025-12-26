import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape", disabled: true },
  { value: "mango", label: "Mango" },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    clearable: { control: "boolean" },
    onClear: { action: "clear" },
    onChange: { action: "change" },
    searchable: { control: "boolean" },
  },
  args: {
    options,
    placeholder: "Choose a fruit",
    clearable: true, // ✅ 기본으로 켜두기 (선택하면 × 보임)
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

/** 기본 */
export const Default: Story = {};

/** 검색 + 클리어 */
export const Searchable: Story = {
  args: {
    searchable: true,
    searchPlaceholder: "Search fruit...",
  },
};

/** Disabled */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "apple",
  },
};

/** Controlled 예시 */
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("banana");
    return (
      <Select
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange?.(v);
        }}
        onClear={() => {
          setValue("");
          args.onClear?.();
        }}
      />
    );
  },
};

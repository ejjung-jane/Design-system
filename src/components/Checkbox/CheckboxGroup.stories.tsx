// src/components/Checkbox/CheckboxGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const options = [
  { value: "a", label: "옵션 A" },
  { value: "b", label: "옵션 B", description: "보조 설명" },
  { value: "c", label: "옵션 C", disabled: true },
];

export const Basic: Story = {
  args: {
    label: "관심사",
    description: "복수 선택 가능합니다.",
    options,
    direction: "vertical",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["a"]);
    return <CheckboxGroup {...args} value={value} onValueChange={setValue} />;
  },
};

export const Horizontal: Story = {
  args: {
    label: "필터",
    options,
    direction: "horizontal",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return <CheckboxGroup {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    label: "약관",
    options,
    error: "필수 항목을 선택해주세요.",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return <CheckboxGroup {...args} value={value} onValueChange={setValue} />;
  },
};

export const DisabledAll: Story = {
  args: {
    label: "비활성 그룹",
    options,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["a"]);
    return <CheckboxGroup {...args} value={value} onValueChange={setValue} />;
  },
};

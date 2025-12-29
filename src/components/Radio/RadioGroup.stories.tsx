// src/components/Radio/RadioGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const options = [
  { value: "a", label: "옵션 A" },
  { value: "b", label: "옵션 B", description: "보조 설명" },
  { value: "c", label: "옵션 C", disabled: true },
];

export const Basic: Story = {
  args: {
    label: "선택",
    description: "하나만 선택 가능합니다.",
    options,
  },
  render: (args) => {
    const [value, setValue] = useState("a");
    return <RadioGroup {...args} value={value} onValueChange={setValue} name="demo" />;
  },
};

export const Horizontal: Story = {
  args: {
    label: "필터",
    options,
    direction: "horizontal",
  },
  render: (args) => {
    const [value, setValue] = useState("b");
    return <RadioGroup {...args} value={value} onValueChange={setValue} name="demo2" />;
  },
};

export const WithError: Story = {
  args: {
    label: "필수 선택",
    options,
    error: "필수 항목입니다.",
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return <RadioGroup {...args} value={value} onValueChange={setValue} name="demo3" />;
  },
};

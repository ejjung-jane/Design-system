// src/components/Checkbox/Checkbox.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    label: "라벨 텍스트",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDescription: Story = {
  args: {
    label: "알림 받기",
    description: "체크하면 이메일 알림을 받습니다.",
  },
};

export const Invalid: Story = {
  args: {
    label: "약관 동의",
    invalid: true,
    description: "필수 항목입니다.",
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <>
        <Checkbox {...args} label="부모" indeterminate={!checked} checked={checked} onChange={(e)=>setChecked(e.target.checked)} />
      </>
    );
  },
};

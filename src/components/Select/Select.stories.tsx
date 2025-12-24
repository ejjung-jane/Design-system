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
  args: {
    options,
    placeholder: "Choose a fruit",
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithPrefix: Story = {
  args: {
    prefix: "🍎",
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Select options={options} size="sm" placeholder="sm" />
      <Select options={options} size="md" placeholder="md" />
      <Select options={options} size="lg" placeholder="lg" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState("banana");
    return (
      <div style={{ maxWidth: 420 }}>
        <Select
          options={options}
          value={val}
          onChange={setVal}
          placeholder="controlled"
        />
      </div>
    );
  },
};

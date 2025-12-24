import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "기본 Input 컴포넌트입니다. size / error / disabled / fullWidth 상태를 제공합니다.",
      },
    },
  },
  args: {
    placeholder: "Type here...",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const FullWidth: Story = { args: { fullWidth: true } };
export const Error: Story = { args: { error: true } };
export const Disabled: Story = { args: { disabled: true } };

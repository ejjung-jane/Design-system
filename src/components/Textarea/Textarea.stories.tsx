import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Write something...",
    fullWidth: true,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid state",
    invalid: true,
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    fullWidth: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
};
export default meta;

export const Basic: StoryObj<typeof TextField> = {
  args: {
    label: "Name",
    helperText: "이름을 입력하세요",
    inputProps: { placeholder: "Jane" },
  },
};

export const Error: StoryObj<typeof TextField> = {
  args: {
    label: "Name",
    errorText: "필수 입력입니다",
    inputProps: { placeholder: "Jane" },
  },
};

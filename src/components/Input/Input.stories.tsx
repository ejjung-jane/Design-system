import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "./Field";

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label / Helper / Error 메시지를 포함한 Field 컴포넌트입니다. 내부적으로 Input을 사용합니다.",
      },
    },
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
  },
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    helperText: "회사 이메일을 입력하세요.",
  },
};

export const WithError: Story = {
  args: {
    requiredMark: true,
    errorText: "유효한 이메일 형식이 아닙니다.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "disabled",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Field label="Small" size="sm" placeholder="sm" />
      <Field label="Medium" size="md" placeholder="md" />
      <Field label="Large" size="lg" placeholder="lg" />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    layout: "horizontal",
    labelWidth: 120,
    label: "Email",
    helperText: "가로 레이아웃 예시입니다.",
  },
};

export const WithPrefix: Story = {
  args: {
    label: "Search",
    placeholder: "검색어 입력",
    prefix: "🔍",
    helperText: "prefix 예시",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Weight",
    placeholder: "0",
    suffix: "kg",
    helperText: "suffix 예시",
  },
};

export const Clearable: Story = {
  render: () => {
    const [val, setVal] = useState("hello");

    return (
      <div style={{ maxWidth: 420 }}>
        <Field
          label="Clearable"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          clearable
          onClear={() => setVal("")}
          placeholder="type..."
        />
      </div>
    );
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <Field label="Default" placeholder="default" />
      <Field
        label="Focused (click input)"
        placeholder="focus me"
      />
      <Field
        label="Error"
        errorText="에러 메시지"
        placeholder="error"
      />
      <Field
        label="Disabled"
        disabled
        placeholder="disabled"
      />
    </div>
  ),
};

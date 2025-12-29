import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextField } from "../TextField";
import { SelectField } from "../SelectField";

const meta: Meta = {
  title: "Patterns/Form",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape", disabled: true },
  { value: "mango", label: "Mango" },
];

export const Basic: Story = {
  render: () => {
    return (
      <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          helperText="회사 이메일을 입력하세요."
        />
        <SelectField
          label="Fruit"
          options={fruitOptions}
          placeholder="Select one"
          helperText="하나를 선택하세요."
        />
      </div>
    );
  },
};

export const Validation: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [fruit, setFruit] = useState("");

    const emailError =
      email && !email.includes("@") ? "이메일 형식이 올바르지 않습니다." : "";

    return (
      <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <TextField
          label="Email"
          requiredMark
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorText={emailError}
          helperText={!emailError ? "회사 이메일을 입력하세요." : undefined}
          placeholder="you@example.com"
        />

        <SelectField
          label="Fruit"
          requiredMark
          options={fruitOptions}
          value={fruit}
          onChange={setFruit}
          errorText={!fruit ? "과일을 선택해주세요." : ""}
          helperText={fruit ? "선택 완료" : ""}
          placeholder="Select one"
          searchable
          searchPlaceholder="Search fruit..."
          clearQueryOnClose
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextField } from "../TextField";
import { SelectField } from "../SelectField";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "peach", label: "Peach" },
];

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

const meta: Meta = {
  title: "Patterns/FormFields",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const MixedForm: Story = {
  render: () => {
    const [fruit, setFruit] = useState("banana");
    return (
      <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          helperText="회사 이메일을 입력하세요."
          prefix="📧"
        />

        <TextField
          label="Password"
          type="password"
          requiredMark
          errorText="비밀번호는 8자 이상이어야 합니다."
          placeholder="••••••••"
        />

        <SelectField
          label="Fruit"
          value={fruit}
          onChange={setFruit}
          options={fruitOptions}
          placeholder="Choose a fruit"
          helperText="하나를 선택하세요."
          prefix="🍎"
        />

        <SelectField
          label="Horizontal"
          layout="horizontal"
          labelWidth={120}
          options={fruitOptions}
          placeholder="Horizontal layout"
          helperText="가로 레이아웃 예시"
        />
      </div>
    );
  },
};

export const SearchableSelectField: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <SelectField
        label="Fruit"
        searchable
        searchPlaceholder="Search fruit..."
        options={options}
        helperText="검색해서 선택하세요."
      />
    </div>
  ),
};
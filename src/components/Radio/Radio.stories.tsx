// src/components/Radio/Radio.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  args: {
    label: "라디오 라벨",
    size: "md",
  },
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState("a");
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Radio
          {...args}
          name="demo"
          value="a"
          checked={val === "a"}
          label="A"
          onChange={() => setVal("a")}
        />
        <Radio
          {...args}
          name="demo"
          value="b"
          checked={val === "b"}
          label="B"
          onChange={() => setVal("b")}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { invalid: true, description: "필수 선택입니다." },
};

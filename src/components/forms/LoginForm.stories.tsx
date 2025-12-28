import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { TextField } from "../TextField";
import { SelectField } from "../SelectField";
import { Button } from "../Button";

const meta: Meta = {
  title: "Forms/LoginForm",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    return (
      <div style={{ maxWidth: 360 }}>
        <TextField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="회사 이메일을 입력하세요."
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorText={password && password.length < 6 ? "6자 이상 입력하세요." : undefined}
        />

        <SelectField
          label="Role"
          value={role}
          onChange={setRole}
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          placeholder="Select role"
        />

        <Button
          fullWidth
          style={{ marginTop: 16 }}
          disabled={!email || !password || !role}
        >
          Login
        </Button>
      </div>
    );
  },
};

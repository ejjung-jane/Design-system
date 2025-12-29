// src/components/ThemeToggle/ThemeToggle.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "./../../theme/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Basic: Story = {
  args: { label: "Theme" },
};

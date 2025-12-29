import React from "react";
import "../src/styles/global.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // html 루트에도 적용 (선택)
      document.documentElement.setAttribute("data-theme", theme);

      // ✅ Story wrapper에 강제 적용 (가장 안정적)
      return (
        <div style={{ background: "var(--page-bg)", color: "var(--ds-text)", padding: 16 }}>
          <Story />
        </div>
      );
    },
  ],

  parameters: {
    controls: { expanded: true },
  },
};

export default preview;

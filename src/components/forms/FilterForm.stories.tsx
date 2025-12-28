// src/components/forms/FilterForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";

import { TextField } from "../TextField";
import { SelectField } from "../SelectField";
import { Button } from "../Button";

const meta: Meta = {
  title: "Forms/FilterForm",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const statusOptions = useMemo(
      () => [
        { value: "", label: "All" },
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
        { value: "archived", label: "Archived" },
      ],
      []
    );

    const rangeOptions = useMemo(
      () => [
        { value: "", label: "All time" },
        { value: "7d", label: "Last 7 days" },
        { value: "30d", label: "Last 30 days" },
        { value: "90d", label: "Last 90 days" },
      ],
      []
    );

    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [range, setRange] = useState("");

    const canSearch = Boolean(keyword.trim() || status || range);

    const onReset = () => {
      setKeyword("");
      setStatus("");
      setRange("");
    };

    return (
      <div style={{ maxWidth: 520 }}>
        <div style={{ display: "grid", gap: 12 }}>
          <SelectField
            label="Date Range"
            options={rangeOptions}
            value={range}
            onChange={setRange}
            placeholder="Select range"
            helperText="기간 필터를 선택하세요."
          />

          <SelectField
            label="Status"
            options={statusOptions}
            value={status}
            onChange={setStatus}
            placeholder="Select status"
          />

          <TextField
            label="Keyword"
            placeholder="Search keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            helperText="키워드로 검색합니다."
          />

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <Button disabled={!canSearch} style={{ flex: 1 }}>
              Search
            </Button>
            <Button
              variant="ghost"
              disabled={!canSearch}
              onClick={onReset}
              style={{ flex: "none" }}
            >
              Reset
            </Button>
          </div>
        </div>

        <div style={{ marginTop: 16, padding: 12, border: "1px solid var(--color-border)", borderRadius: 12 }}>
          <div style={{ fontSize: 12, color: "var(--color-gray-500)", marginBottom: 8 }}>
            Current Filter State (for demo)
          </div>
          <pre style={{ margin: 0, fontSize: 12 }}>
{JSON.stringify(
  { range, status, keyword: keyword.trim() },
  null,
  2
)}
          </pre>
        </div>
      </div>
    );
  },
};

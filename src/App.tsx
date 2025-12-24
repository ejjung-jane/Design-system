import "./styles/global.css";
import { Button } from "./components/Button";
import { Field } from "./components/Input";

export default function App() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 12, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, margin: 0 }}>Design System</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>

      <Field label="Email" placeholder="you@example.com" helperText="회사 이메일을 입력하세요." />

      <Field
        label="Password"
        type="password"
        placeholder="••••••••"
        requiredMark
        errorText="비밀번호는 8자 이상이어야 합니다."
      />

      <Field label="Disabled" disabled placeholder="비활성 상태" />

      <Field label="Size sm" size="sm" placeholder="small" />
      <Field label="Size lg" size="lg" placeholder="large" />
    </div>
  );
}

import "./styles/global.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

export default function App() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 12, maxWidth: 560 }}>
      <h1 style={{ fontSize: 24, margin: 0 }}>Design System</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>

      <Input placeholder="Input md" />
      <Input size="sm" placeholder="Input sm" />
      <Input size="lg" placeholder="Input lg" />
      <Input fullWidth placeholder="Full width input" />
      <Input error placeholder="Error input" />
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}

import "./styles/global.css";
import { Button } from "./components/Button";

export default function App() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 12, maxWidth: 520 }}>
      <h1 style={{ fontSize: 24, margin: 0 }}>Design System</h1>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary" size="sm">
          Primary sm
        </Button>
        <Button variant="primary" size="md">
          Primary md
        </Button>
        <Button variant="primary" size="lg">
          Primary lg
        </Button>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>

      <Button fullWidth variant="primary">
        Full width
      </Button>
    </div>
  );
}

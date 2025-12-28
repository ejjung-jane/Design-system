// src/components/Modal/Modal.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Confirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirm</Button>

        <Modal
          open={open}
          title="Delete item?"
          onClose={() => setOpen(false)}
          initialFocusSelector='button[data-primary="true"]'
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              {/* <Button data-primary="true">Confirm</Button> */}
              <Button
                variant="primary"
                onClick={() => {
                  // demo action
                  setOpen(false);
                }}
              >
                Confirm
              </Button>
            </>
          }
        >
          This action cannot be undone.
        </Modal>
      </>
    );
  },
};

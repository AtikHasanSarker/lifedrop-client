"use client";

import {
  Button,
  Input,
  Modal,
} from "@heroui/react";
import { Rocket } from "lucide-react";

export default function GiveFundModal() {

  return (
    <>
      <Modal>
        <Button variant="secondary">Give Fund</Button>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-default text-foreground">
                  <Rocket className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Give Funding</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <Input
                  label="Amount"
                  type="number"
                  placeholder="Enter amount"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" variant="light" slot="close">
                  Cancel
                </Button>

                <form action={"/api/payment"} method="POST">
                  <Button type="submit" color="danger">
                    Pay Now
                  </Button>
                </form>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}

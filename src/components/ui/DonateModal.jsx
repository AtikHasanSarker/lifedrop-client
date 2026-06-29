"use client";

import { authClient } from "@/lib/auth-client";
import {Button, Modal} from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import Input from "./Input";
import { updateDonationRequest } from "@/lib/actions/requests";

export function DonateModal({id, status}) {
    const { data: session } = authClient.useSession();
        const user = session?.user;

  return (
    <div className="flex flex-wrap gap-4">
      <Modal>
        <Button
        isDisabled={status !== "pending" || user?.status !== "active"}
          size="lg"
          radius="lg"
          className="bg-red-600 w-full md:w-auto px-14 h-18 text-2xl font-semibold shadow-xl shadow-red-500/20 hover:scale-[1.03] transition-all duration-300"
        >
          ❤️ Donate Now
        </Button>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-100">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="mx-auto">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center p-4 mt-5">
                    <ShieldCheck size={32} className="text-red-600" />
                  </div>
                </Modal.Icon>
                <Modal.Heading>
                  <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold">Confirm Donation</h2>

                    <p className="text-default-500 mt-2 leading-7 text-xs">
                      Please confirm that you are available and willing to
                      donate blood for this patient.
                    </p>
                  </div>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-4 mt-2">
                  <Input
                    label="DONOR NAME"
                    value={user?.name}
                    readOnly
                    classNames={{
                      label:
                        "text-[11px] uppercase tracking-[3px] font-semibold text-default-500",
                      input: "font-semibold",
                    }}
                  />

                  <Input
                    label="DONOR EMAIL"
                    value={user?.email}
                    readOnly
                    classNames={{
                      label:
                        "text-[11px] uppercase tracking-[3px] font-semibold text-default-500",
                      input: "font-semibold",
                    }}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <Button
                    onClick={() => updateDonationRequest(id)}
                    slot="close"
                    fullWidth
                    size="lg"
                    radius="lg"
                    className="h-14 bg-red-600 text-lg font-bold shadow-xl shadow-red-500/20"
                  >
                    Confirm & Start
                  </Button>

                  <button
                    slot="close"
                    className="w-full mt-5 text-center text-default-500 font-medium hover:text-danger transition"
                  >
                    I changed my mind
                  </button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
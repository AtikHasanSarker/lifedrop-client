"use client";

import { deleteDonationRequest } from "@/lib/actions/requests";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export function DeleteModal() {
    const handleDelete = async (id) => {
      const { data: tokenData } = await authClient.token();
      const data = await deleteDonationRequest(id, tokenData?.token);

      if (data.deletedCount > 0) {
        toast.success("Donation request deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete donation request");
      }
    };

  return (
    <AlertDialog>
      <Button className="p-0" variant="flate">
        <Trash2 size={16} /> Delete request
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Request permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>this request</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(request._id)}
                slot="close"
                variant="danger"
              >
                Delete Request
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

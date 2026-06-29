"use client";
import { Button, Chip, Table, Dropdown, Label } from "@heroui/react";
import { CircleCheck, CircleX, EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import {
  deleteDonationRequest,
  updatePublicRequest,
} from "@/lib/actions/requests";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const RequestTable = ({ donationRequests }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleUpdateRequest = async (id, status) => {
    const payload =
      status === "done" || status === "canceled" ? { status } : null;

    const data = await updatePublicRequest(id, payload);
    if (data.modifiedCount > 0) {
      router.refresh();
    }
  };

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

  const statusColor = {
    pending: "warning",
    inprogress: "accent",
    done: "success",
    canceled: "danger",
  };
  return (
    <div>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your Donation Requests
          </h1>
          <p className="text-default-500 mt-2 max-w-2xl">
            Manage your donation requests across mobile, tablet, and desktop.
          </p>
        </div>

        {/* For mobile devices */}
        <div className="space-y-4 md:hidden">
          {donationRequests.map((request, index) => (
            <article
              key={request._id}
              className="rounded-3xl border border-default-200 bg-white p-4 shadow-sm flex justify-between"
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p># {index + 1}</p>
                    <div className="flex gap-2">
                      <h2 className="text-lg font-semibold text-slate-900">
                        {request.recipientName}
                      </h2>
                      <Chip
                        color={statusColor[request.status]}
                        variant="primary"
                        className="rounded-full capitalize px-2 py-1 text-[10px] font-bold"
                      >
                        {request.status}
                      </Chip>
                    </div>
                    <p className="text-sm text-default-500">
                      {request.recipientDistrict}
                    </p>
                    <div>
                      <span className="font-semibold text-sm">
                        Blood Group:
                      </span>{" "}
                      <Chip
                        color="danger"
                        variant="primary"
                        className="rounded-full px-2 py-1 text-xs font-bold"
                      >
                        {request.bloodGroup}
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>

              <Dropdown>
                <Button variant="outline">
                  <EllipsisVertical />
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="view-request" textValue="View request">
                      <Link href={`/donation-requests/${request._id}`}>
                        <Label className="flex items-center gap-2">
                          <Eye size={16} /> View Request
                        </Label>
                      </Link>
                    </Dropdown.Item>

                    {request.status !== "done" && (
                      <>
                        <Dropdown.Item
                          onClick={() =>
                            handleUpdateRequest(request._id, "done")
                          }
                          id="done"
                          textValue="Done"
                        >
                          <Label className="flex items-center gap-2">
                            <CircleCheck size={16} color="green" />
                            Done
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleUpdateRequest(request._id, "canceled")
                          }
                          id="cancel"
                          textValue="Cancel"
                        >
                          <Label className="flex items-center gap-2">
                            <CircleX size={16} color="red" />
                            Cancel
                          </Label>
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="edit-request"
                          textValue="Edit request"
                        >
                          <Link
                            href={`/dashboard/${user.role}/edit-request/${request._id}`}
                          >
                            <Label className="flex items-center gap-2 text-accent">
                              <Pencil size={16} />
                              Edit Request
                            </Label>
                          </Link>
                        </Dropdown.Item>
                      </>
                    )}

                    <Dropdown.Item
                      id="delete-request"
                      textValue="Delete request"
                      variant="danger"
                      onClick={() => handleDelete(request._id)}
                    >
                      <Label className="flex items-center gap-2">
                        <Trash2 size={16} /> Delete Request
                      </Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </article>
          ))}
        </div>

        {/* For larger screens */}
        <div className="hidden md:block">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Booked requests"
                className="min-w-full"
              >
                <Table.Header className="text-xs text-muted">
                  <Table.Column isRowHeader>#</Table.Column>
                  <Table.Column>RECIPIENT</Table.Column>
                  <Table.Column>LOCATION</Table.Column>
                  <Table.Column>NEED</Table.Column>
                  <Table.Column>STATUS</Table.Column>
                  <Table.Column>ACTIONS</Table.Column>
                </Table.Header>
                <Table.Body>
                  {donationRequests.map((request, index) => (
                    <Table.Row key={request._id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{request.recipientName}</Table.Cell>
                      <Table.Cell>{request.recipientDistrict}</Table.Cell>
                      <Table.Cell>
                        <Chip
                          color="danger"
                          variant="primary"
                          className="rounded-full px-2 py-1 text-xs font-bold"
                        >
                          {request.bloodGroup}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <Chip
                          color={statusColor[request.status]}
                          variant="primary"
                          className="rounded-full capitalize px-2 py-1 text-xs font-bold"
                        >
                          {request.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown>
                          <Button variant="outline">
                            <EllipsisVertical />
                          </Button>
                          <Dropdown.Popover>
                            <Dropdown.Menu
                              onAction={(key) =>
                                console.log(`Selected: ${key}`)
                              }
                            >
                              <Dropdown.Item
                                id="view-request"
                                textValue="View request"
                              >
                                <Link
                                  href={`/donation-requests/${request._id}`}
                                >
                                  <Label className="flex items-center gap-2">
                                    <Eye size={16} /> View Request
                                  </Label>
                                </Link>
                              </Dropdown.Item>
                              {request.status !== "done" && (
                                <>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleUpdateRequest(request._id, "done")
                                    }
                                    id="done"
                                    textValue="Done"
                                  >
                                    <Label className="flex items-center gap-2">
                                      <CircleCheck size={16} color="green" />
                                      Done
                                    </Label>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleUpdateRequest(
                                        request._id,
                                        "canceled",
                                      )
                                    }
                                    id="cancel"
                                    textValue="Cancel"
                                  >
                                    <Label className="flex items-center gap-2">
                                      <CircleX size={16} color="red" />
                                      Cancel
                                    </Label>
                                  </Dropdown.Item>

                                  <Dropdown.Item
                                    id="edit-request"
                                    textValue="Edit request"
                                  >
                                    <Link
                                      href={`/dashboard/${user.role}/edit-request/${request._id}`}
                                    >
                                      <Label className="flex items-center gap-2 text-accent">
                                        <Pencil size={16} />
                                        Edit Request
                                      </Label>
                                    </Link>
                                  </Dropdown.Item>
                                </>
                              )}
                              <Dropdown.Item
                                id="delete-request"
                                textValue="Delete request"
                                variant="danger"
                                onClick={() => handleDelete(request._id)}
                              >
                                <Label className="flex items-center gap-2">
                                  <Trash2 size={16} /> Delete Request
                                </Label>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RequestTable;

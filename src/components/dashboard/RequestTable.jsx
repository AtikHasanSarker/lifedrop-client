'use client';
import { Button, Chip, Table, Dropdown, Label } from "@heroui/react";
import { CircleCheck, CircleX, EllipsisVertical, Trash2 } from "lucide-react";
import { deleteDonationRequest } from "@/lib/actions/requests";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RequestTable = ({ donationRequests }) => {
    const router = useRouter();

      const handleDelete = async (id) => {
        const data = await deleteDonationRequest(id);

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

          {/* Foe mobile devices */}
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
                        <span className="font-semibold text-sm">Blood Group:</span>{" "}
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
                  <Button
                    isDisabled={request.status !== "inprogress"}
                    variant="outline"
                  >
                    <EllipsisVertical />
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      onAction={(key) => console.log(`Selected: ${key}`)}
                    >
                      <Dropdown.Item id="copy-link" textValue="Done">
                        <Label className="flex items-center gap-2">
                          <CircleCheck size={16} color="green" />
                          Done
                        </Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="cancel" textValue="Cancel">
                        <Label className="flex items-center gap-2">
                          <CircleX size={16} color="red" />
                          Cancel
                        </Label>
                      </Dropdown.Item>
                      <Dropdown.Item
                        id="delete-file"
                        textValue="Delete file"
                        variant="danger"
                        onClick={() => handleDelete(request._id)}
                      >
                        <Label className="flex items-center gap-2">
                          <Trash2 size={16} /> Delete file
                        </Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </article>
            ))}
          </div>

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
                        <Table.Cell>{request.bloodGroup}</Table.Cell>
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
                            <Button
                              isDisabled={request.status !== "inprogress"}
                              variant="outline"
                            >
                              <EllipsisVertical />
                            </Button>
                            <Dropdown.Popover>
                              <Dropdown.Menu
                                onAction={(key) =>
                                  console.log(`Selected: ${key}`)
                                }
                              >
                                <Dropdown.Item id="copy-link" textValue="Done">
                                  <Label className="flex items-center gap-2">
                                    <CircleCheck size={16} color="green" />
                                    Done
                                  </Label>
                                </Dropdown.Item>
                                <Dropdown.Item id="cancel" textValue="Cancel">
                                  <Label className="flex items-center gap-2">
                                    <CircleX size={16} color="red" />
                                    Cancel
                                  </Label>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  id="delete-file"
                                  textValue="Delete file"
                                  variant="danger"
                                  onClick={() => handleDelete(request._id)}
                                >
                                  <Label className="flex items-center gap-2">
                                    <Trash2 size={16} /> Delete file
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
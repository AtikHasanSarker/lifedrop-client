"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Chip, Dropdown, Label, Table } from "@heroui/react";
import { CircleCheck, CircleX, EllipsisVertical, Trash2 } from "lucide-react";
import { deleteDonationRequest } from "@/lib/actions/requests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AllDonationRequestsPage = () => {
  const router= useRouter()
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [donationRequests, setDonationRequests] = useState([]);

  console.log(donationRequests);

  useEffect(() => {
    if (!user?.id) return;
    const fetchDonationRequests = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-requests`,
        );
        const data = await res.json();

        console.log(data);
        setDonationRequests(data);
      } catch (error) {
        console.error("error in fetching");
      }
    };

    fetchDonationRequests();
  }, [user?.id]);

  const statusColor = {
    pending: "warning",
    inprogress: "accent",
    done: "success",
    canceled: "danger",
  };

  const handleDelete = async (id) => {
    const data = await deleteDonationRequest(id);

    if (data.deletedCount > 0) {
      toast.success("Donation request deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete donation request");
    }
  };

  return (
    <div className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {donationRequests?.length > 0 ? (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
              All Donation Requests
            </h1>
            <p className="text-default-500 mt-2 max-w-2xl">
              Manage donation requests across mobile, tablet, and desktop.
            </p>
          </div>

          {/* <div className="space-y-4 md:hidden">
            {donationRequests.map((request) => (
              <article
                key={request._id}
                className="rounded-3xl border border-default-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {request.tutorName}
                    </h2>
                    <p className="text-sm text-default-500">
                      {request.subject}
                    </p>
                  </div>

                  <Chip
                    color={statusColor[request.status]}
                    variant="primary"
                    className="absolute left-6 top-6 rounded-full capitalize px-2 py-1 text-xs font-bold"
                  >
                    {request.status}
                  </Chip>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                  <div>
                    <span className="font-semibold">Student:</span>{" "}
                    {request.userName}
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    {request.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {request.email}
                  </div>
                </div>

                <Button
                  isDisabled={request.status === "Cancelled"}
                  onClick={() => handleRemove(request._id)}
                  variant="danger-soft"
                  className="mt-4 w-full text-red-600"
                >
                  Remove
                </Button>
              </article>
            ))}
          </div> */}

          <div className="hidden md:block">
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Booked requests"
                  className="min-w-full"
                >
                  <Table.Header className="text-xs text-muted">
                    <Table.Column isRowHeader>#</Table.Column>
                    <Table.Column>PARTICIPANTS</Table.Column>
                    <Table.Column>LOCATION</Table.Column>
                    <Table.Column>NEED</Table.Column>
                    <Table.Column>STATUS</Table.Column>
                    <Table.Column>ACTIONS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {donationRequests.map((request, index) => (
                      <Table.Row key={request._id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>
                          <p className="font-bold">
                            {request.recipientName}{" "}
                            <span className="text-[10px] text-muted">Recipient</span>
                          </p>
                          <p className="text-xs text-muted font-semibold italic">
                            Requested by {request.requesterName}
                          </p>
                        </Table.Cell>
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
                                <Dropdown.Item id="done" textValue="Done">
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
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <h3 className="text-2xl font-semibold text-center">
            No Recent Donation Requests.
          </h3>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequestsPage;

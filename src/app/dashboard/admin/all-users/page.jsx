"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Chip, Dropdown, Label, Table } from "@heroui/react";
import { CircleX, EllipsisVertical, Trash2 } from "lucide-react";
import { updateUser } from "@/lib/actions/requests";
import { useRouter } from "next/navigation";

const UsersManagementPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
        const data = await res.json();

        console.log(data);
        setAllUsers(data);
      } catch (error) {
        console.error("error in fetching");
      }
    };

    fetchAllUsers();
  }, [user?.id]);

  const roleColor = {
    donor: "warning",
    volunteer: "accent",
    admin: "danger",
  };

  const handleUpdateUser = async (id, info) => {
    if (info === "blocked" || info === "active") {
      const status = { status: info };
      const data = await updateUser(id, status);
      console.log(data);
      if (data.modifiedCount > 0) {
        router.refresh();
      }
    } else {
      const role = { role: info };
      const data = await updateUser(id, role);
      if (data.modifiedCount > 0) {
        router.refresh();
      }
    }
  };

  return (
    <div className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {allUsers?.length > 0 ? (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">All Users</h1>
            <p className="text-default-500 mt-2 max-w-2xl">
              Manage your users across mobile, tablet, and desktop.
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
                    <Table.Column>USER PROFILE</Table.Column>
                    <Table.Column>EMAIL</Table.Column>
                    <Table.Column>ROLE</Table.Column>
                    <Table.Column>STATUS</Table.Column>
                    <Table.Column>ACTIONS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {allUsers.map((user, index) => (
                      <Table.Row key={user._id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell className="flex items-center gap-3">
                          <Avatar size="md">
                            <Avatar.Image alt={user?.name} src={user?.image} />
                            <Avatar.Fallback>
                              {user.name.charAt(0)}
                            </Avatar.Fallback>
                          </Avatar>
                          <p className="font-bold text-[16px]">{user.name}</p>
                        </Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                          <Chip
                            color={roleColor[user.role]}
                            variant="soft"
                            className="rounded-full capitalize px-2 py-1 text-xs font-bold"
                          >
                            {user.role}
                          </Chip>
                        </Table.Cell>
                        <Table.Cell>
                          <Chip
                            color={
                              user.status === "active" ? "success" : "danger"
                            }
                            variant="primary"
                            className="rounded-full capitalize px-2 py-1 text-xs font-bold"
                          >
                            {user.status}
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
                                {user.status === "active" ? (
                                  <Dropdown.Item
                                    onClick={() =>
                                      handleUpdateUser(user._id, "blocked")
                                    }
                                    id="block-user"
                                    textValue="Block User"
                                  >
                                    <Label className="flex items-center gap-2">
                                      <CircleX size={16} color="red" />
                                      Block User
                                    </Label>
                                  </Dropdown.Item>
                                ) : (
                                  <Dropdown.Item
                                    onClick={handleUpdateUser(
                                      user._id,
                                      "active",
                                    )}
                                    id="block-user"
                                    textValue="Block User"
                                  >
                                    <Label className="flex items-center gap-2">
                                      <CircleX size={16} color="green" />
                                      Unblock User
                                    </Label>
                                  </Dropdown.Item>
                                )}

                                <Dropdown.Item
                                  onClick={handleUpdateUser(
                                    user._id,
                                    "volunteer",
                                  )}
                                  id="make-volunteer"
                                  textValue="Make Volunteer"
                                >
                                  <Label className="flex items-center gap-2">
                                    <CircleX size={16} color="red" />
                                    Make Volunteer
                                  </Label>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  id="make-admin"
                                  textValue="Make Admin"
                                  variant="danger"
                                  onClick={handleUpdateUser(user._id, "admin")}
                                >
                                  <Label className="flex items-center gap-2">
                                    <Trash2 size={16} /> Make Admin
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
          <h3 className="text-2xl font-semibold text-center">No Users.</h3>
        </div>
      )}
    </div>
  );
};

export default UsersManagementPage;

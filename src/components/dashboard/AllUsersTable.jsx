'use client';

import { updateUser } from "@/lib/actions/requests";
import { Avatar, Button, Chip, Dropdown, Label, Table } from "@heroui/react";
import { CircleX, EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AllUsersTable = ({ allUsers }) => {
    const router = useRouter();

    const handleUpdateUser = async (id, info) => {
      const payload =
        info === "blocked" || info === "active"
          ? { status: info }
          : { role: info };

      const data = await updateUser(id, payload);
      console.log(data);

      if (data.modifiedCount > 0) {
        router.refresh();
      }
    };
  const roleColor = {
    donor: "warning",
    volunteer: "accent",
    admin: "danger",
  };
  return (
    <div>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">All Users</h1>
          <p className="text-default-500 mt-2 max-w-2xl">
            Manage your users across mobile, tablet, and desktop.
          </p>
        </div>

        {/* for mobile devices */}


      {/* for larger screens */}
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
                          <Button isDisabled={user.role === "admin"} variant="outline">
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
                                  onClick={() =>
                                    handleUpdateUser(user._id, "active")
                                  }
                                  id="block-user"
                                  textValue="Block User"
                                >
                                  <Label className="flex items-center gap-2">
                                    <CircleX size={16} color="green" />
                                    Unblock User
                                  </Label>
                                </Dropdown.Item>
                              )}

                              {user.role === "donor" ? (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleUpdateUser(user._id, "volunteer")
                                  }
                                  id="make-volunteer"
                                  textValue="Make Volunteer"
                                >
                                  <Label className="flex items-center gap-2">
                                    <CircleX size={16} color="red" />
                                    Make Volunteer
                                  </Label>
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  onClick={() =>
                                    handleUpdateUser(user._id, "donor")
                                  }
                                  id="make-donor"
                                  textValue="Make Donor"
                                >
                                  <Label className="flex items-center gap-2">
                                    <CircleX size={16} color="red" />
                                    Make Donor
                                  </Label>
                                </Dropdown.Item>
                              )}

                              {user.role === "volunteer" && (
                                <Dropdown.Item
                                  id="make-admin"
                                  textValue="Make Admin"
                                  variant="danger"
                                  onClick={() =>
                                    handleUpdateUser(user._id, "admin")
                                  }
                                >
                                  <Label className="flex items-center gap-2">
                                    <Trash2 size={16} /> Make Admin
                                  </Label>
                                </Dropdown.Item>
                              )}
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

export default AllUsersTable;

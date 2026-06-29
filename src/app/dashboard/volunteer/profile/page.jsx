"use client";

import { useState } from "react";
import { Avatar, Button, Card, Chip, Separator } from "@heroui/react";

import {
  Pencil,
  User,
  Mail,
  Droplets,
  MapPin,
  Shield,
  CircleUser,
  Save,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { districts, districtUpazilas } from "@/app/data/DistrictUpazilas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { imageUpload } from "@/lib/actions/imgUpload";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [district, setDistrict] = useState(user?.district);

  if (!user) {
    return <Loading />;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());
    if (updatedData.image) {
      const image = await imageUpload(updatedData.image);
      updatedData.image = image.url;
    }

    const data = await authClient.updateUser(updatedData);

    if (data) {
      toast.success("Profile updated successfully");
      router.refresh();
    } else {
      toast.error("Failed to update profile");
    }
    setIsEditing(false);
  };

  const roleColor = {
    donor: "warning",
    volunteer: "accent",
    admin: "danger",
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-red-50 via-white to-rose-50">
      {/* Hero */}

      <div className="h-56 bg-linear-to-r from-red-600 via-rose-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-28 pb-16">
        {/* Profile Card */}

        <Card shadow="lg" className="rounded-[30px] overflow-visible">
          <Card.Content className="p-6">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Left */}

              <div className="flex flex-col md:flex-row gap-8">
                <Avatar className="w-40 h-40 text-large border-[6px] border-white shadow-xl">
                  <Avatar.Image alt={user?.name} src={user?.image} />
                </Avatar>

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black">{user?.name}</h1>

                    <Chip
                      color={user.status === "active" ? "success" : "danger"}
                      variant="primary"
                      className="capitalize"
                    >
                      {user.status}
                    </Chip>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-default-500">
                    <Mail size={17} />

                    {user.email}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3 font-semibold">
                    Blood Group:
                    <Chip
                      className="bg-red-700 text-white"
                      variant="primary"
                      startContent={<Droplets size={15} />}
                    >
                      {user.bloodGroup}
                    </Chip>
                  </div>

                  <div className="mt-3 font-semibold">
                    <Chip
                      color={roleColor[user.role]}
                      variant="primary"
                      startContent={<Shield size={15} />}
                      className="capitalize"
                    >
                      {user.role}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Edit Button */}

              {!isEditing ? (
                <Button
                  color="danger"
                  radius="full"
                  onPress={() => setIsEditing(true)}
                >
                  {" "}
                  <Pencil size={18} />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="outline" onPress={() => setIsEditing(false)}>
                    Cancel
                  </Button>

                  <Button variant="danger" type="submit" form="profile-form">
                    <Save size={18} />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        {/* Personal Information */}

        <Card shadow="lg" className="mt-6 rounded-[30px]">
          <Card.Content className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <User size={24} className="text-red-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">Personal Information</h2>

                <p className="text-default-500">
                  Update your personal details.
                </p>
              </div>
            </div>

            <Separator className="mb-4" />

            <form id="profile-form" onSubmit={handleSave}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}

                <Input
                  label="Full Name"
                  name="name"
                  defaultValue={user.name}
                  readOnly={!isEditing}
                  variant="bordered"
                  startContent={<User size={18} color="green" />}
                />

                {/* Email */}

                <Input
                  label="Email"
                  defaultValue={user.email}
                  disabled={true}
                  variant="bordered"
                  startContent={<Mail size={18} color="blue" />}
                />

                {/* District */}

                <Select
                  disabled={!isEditing}
                  defaultValue={user.district}
                  onChange={(e) => setDistrict(e.target.value)}
                  label="District"
                  name="district"
                  options={districts}
                  placeholder="Select District"
                />

                <Select
                  disabled={!isEditing}
                  defaultValue={user.upazila}
                  label="Upazila"
                  name="upazila"
                  options={districtUpazilas[district]}
                  placeholder="Select Upazila"
                />
                {/* Blood Group */}

                <Input
                  label="Blood Group"
                  name="bloodGroup"
                  defaultValue={user.bloodGroup}
                  readOnly={!isEditing}
                  variant="bordered"
                  startContent={<Droplets size={18} color="red" />}
                />

                {/* Profile Picture  */}
                <Input
                  name="image"
                  startContent={<CircleUser size={18} color="purple" />}
                  type="file"
                  label="Profile Picture"
                  labelPlacement="outside"
                  disabled={!isEditing}
                  variant="bordered"
                  accept="image/*"
                />
              </div>
              {isEditing && (
                <div className="mt-10 rounded-2xl bg-red-50 border border-red-100 p-5">
                  <p className="text-red-700 font-medium">
                    ⚠️ Email address cannot be changed. Only your personal
                    information and avatar can be updated.
                  </p>
                </div>
              )}
            </form>
          </Card.Content>
        </Card>

        {/* Account Summary */}

        <Card shadow="lg" className="rounded-[30px] mt-6">
          <Card.Content className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Account Summary</h3>

                <p className="text-default-500 mt-2">
                  Your account information at a glance.
                </p>
              </div>

              <Chip color="success" variant="flat" className="font-semibold">
                Verified
              </Chip>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-3xl bg-red-50 p-6 text-center">
                <Droplets size={34} className="mx-auto text-red-600 mb-3" />

                <h2 className="text-3xl font-black">{user.bloodGroup}</h2>

                <p className="text-default-500 mt-2">Blood Group</p>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6 text-center">
                <MapPin size={34} className="mx-auto text-blue-600 mb-3" />

                <h2 className="text-xl font-bold">{user.district}</h2>

                <p className="text-default-500 mt-2">District</p>
              </div>

              <div className="rounded-3xl bg-green-50 p-6 text-center">
                <Shield size={34} className="mx-auto text-green-600 mb-3" />

                <h2 className="text-xl font-bold capitalize">{user.role}</h2>

                <p className="text-default-500 mt-2">Role</p>
              </div>

              <div className="rounded-3xl bg-orange-50 p-6 text-center">
                <User size={34} className="mx-auto text-orange-600 mb-3" />

                <h2 className="text-xl font-bold capitalize">{user.status}</h2>

                <p className="text-default-500 mt-2">Status</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Separator,
  Input,
} from "@heroui/react";

import {
  Pencil,
  User,
  Mail,
  Droplets,
  MapPin,
  Shield,
} from "lucide-react";

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
    bloodGroup: user?.bloodGroup || "",
    avatar: user?.avatar || "",
    role: user?.role || "donor",
    status: user?.status || "active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Hero */}

      <div className="h-56 bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-28 pb-16">
        {/* Profile Card */}

        <Card shadow="lg" className="rounded-[30px] overflow-visible">
          <Card.Content className="p-10">
            <div className="flex flex-col lg:flex-row justify-between gap-10">
              {/* Left */}

              <div className="flex flex-col md:flex-row gap-8">
                <Avatar
                  src={formData.avatar}
                  className="w-40 h-40 text-large border-[6px] border-white shadow-xl"
                />

                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black">{formData.name}</h1>

                    <Chip
                      color={
                        formData.status === "active" ? "success" : "danger"
                      }
                      variant="flat"
                    >
                      {formData.status}
                    </Chip>
                  </div>

                  <div className="flex items-center gap-2 mt-4 text-default-500">
                    <Mail size={17} />

                    {formData.email}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <Chip
                      color="danger"
                      variant="flat"
                      startContent={<Droplets size={15} />}
                    >
                      {formData.bloodGroup}
                    </Chip>

                    <Chip
                      color="secondary"
                      variant="flat"
                      startContent={<Shield size={15} />}
                    >
                      {formData.role}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* Edit Button */}

              {!isEditing ? (
                <Button
                  color="danger"
                  radius="full"
                  startContent={<Pencil size={18} />}
                  onPress={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="flat" onPress={() => setIsEditing(false)}>
                    Cancel
                  </Button>

                  <Button color="danger">Save Changes</Button>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        {/* Personal Information */}

        <Card shadow="lg" className="mt-8 rounded-[30px]">
          <Card.Content className="p-10">
            <div className="flex items-center gap-3 mb-8">
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

            <Separator className="mb-8" />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}

              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isReadOnly={!isEditing}
                variant="bordered"
                startContent={<User size={18} />}
              />

              {/* Email */}

              <Input
                label="Email"
                value={formData.email}
                isReadOnly
                variant="bordered"
                startContent={<Mail size={18} />}
              />

              {/* District */}

              <Input
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                isReadOnly={!isEditing}
                variant="bordered"
                startContent={<MapPin size={18} />}
              />

              {/* Upazila */}

              <Input
                label="Upazila"
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                isReadOnly={!isEditing}
                variant="bordered"
                startContent={<MapPin size={18} />}
              />
              {/* Blood Group */}

              <Input
                label="Blood Group"
                value={formData.bloodGroup}
                isReadOnly
                variant="bordered"
                startContent={<Droplets size={18} />}
              />

              {/* Role */}

              <Input
                label="Role"
                value={formData.role}
                isReadOnly
                variant="bordered"
                startContent={<Shield size={18} />}
              />

              {/* Status */}

              <Input
                label="Account Status"
                value={formData.status}
                isReadOnly
                variant="bordered"
                startContent={<Shield size={18} />}
              />

              {/* Avatar */}

              <div className="md:col-span-2">
                <p className="text-sm font-semibold mb-3">Profile Picture</p>

                <div className="flex flex-col md:flex-row items-center gap-6 rounded-3xl border-2 border-dashed border-default-200 p-6">
                  <Avatar
                    src={formData.avatar}
                    className="w-28 h-28 border-4 border-white shadow-lg"
                  />

                  <div className="flex-1">
                    <p className="text-default-500 mb-4">
                      Upload a new profile picture.
                    </p>

                    <input
                      type="file"
                      disabled={!isEditing}
                      className="block w-full text-sm
                      file:mr-4
                      file:rounded-xl
                      file:border-0
                      file:bg-red-600
                      file:px-5
                      file:py-2
                      file:text-white
                      file:cursor-pointer
                      cursor-pointer
                      disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Account Summary */}

        <Card shadow="lg" className="rounded-[30px] mt-8">
          <Card.Content className="p-8">
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

            <Separator className="my-8" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-3xl bg-red-50 p-6 text-center">
                <Droplets size={34} className="mx-auto text-red-600 mb-3" />

                <h2 className="text-3xl font-black">{formData.bloodGroup}</h2>

                <p className="text-default-500 mt-2">Blood Group</p>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6 text-center">
                <MapPin size={34} className="mx-auto text-blue-600 mb-3" />

                <h2 className="text-xl font-bold">{formData.district}</h2>

                <p className="text-default-500 mt-2">District</p>
              </div>

              <div className="rounded-3xl bg-green-50 p-6 text-center">
                <Shield size={34} className="mx-auto text-green-600 mb-3" />

                <h2 className="text-xl font-bold capitalize">
                  {formData.role}
                </h2>

                <p className="text-default-500 mt-2">Role</p>
              </div>

              <div className="rounded-3xl bg-orange-50 p-6 text-center">
                <User size={34} className="mx-auto text-orange-600 mb-3" />

                <h2 className="text-xl font-bold capitalize">
                  {formData.status}
                </h2>

                <p className="text-default-500 mt-2">Status</p>
              </div>
            </div>

            {isEditing && (
              <div className="mt-10 rounded-2xl bg-red-50 border border-red-100 p-5">
                <p className="text-red-700 font-medium">
                  ⚠️ Email address cannot be changed. Only your personal
                  information and avatar can be updated.
                </p>
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    </section>
  );
}
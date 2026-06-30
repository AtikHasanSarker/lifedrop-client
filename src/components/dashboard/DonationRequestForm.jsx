"use client";
import { districts, districtUpazilas } from "@/app/data/DistrictUpazilas";
import Select from "@/components/ui/Select";
import { authClient } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import {
  CalendarDays,
  Clock3,
  Droplets,
  Hospital,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DonationRequestForm = ({ user }) => {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { data: tokenData } = await authClient.token();
      const requestData = Object.fromEntries(formData.entries());
      requestData.userId = user?.id;
      requestData.status = "pending";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-requests`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(requestData),
        },
      );
      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Request submitted successfully");
        router.push("/dashboard/donor/my-requests");
      } else {
        toast.error("Failed to create Request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Requester Information */}

          <div className="mb-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3">
                <User className="text-red-600" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Requester Information
                </h2>

                <p className="text-sm text-gray-500">
                  These fields are automatically filled.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Requester Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    name="requesterName"
                    type="text"
                    value={user?.name}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-11 pr-4 text-gray-600 outline-none"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Requester Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    name="requesterEmail"
                    type="email"
                    value={user?.email}
                    readOnly
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-100 pl-11 pr-4 text-gray-600 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-6 border-t border-dashed border-gray-200"></div>

          {/* Recipient Information */}

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-red-100 p-3">
                <Droplets className="text-red-600" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Recipient Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the blood recipient details.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recipient Name */}

              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Recipient Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    name="recipientName"
                    type="text"
                    placeholder="Enter recipient name"
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* District */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Recipient District
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Select
                    required
                    label="District"
                    name="recipientDistrict"
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    options={districts}
                    placeholder="Select District"
                  />
                </div>
              </div>

              {/* Upazila */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Recipient Upazila
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <Select
                    required
                    label="Upazila"
                    name="recipientUpazila"
                    options={districtUpazilas[selectedDistrict] || []}
                    placeholder="Select Upazila"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}

          <div className="my-6 border-t border-dashed border-gray-200"></div>

          {/* Hospital Information */}

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <Hospital className="text-blue-600" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Hospital Information
                </h2>

                <p className="text-sm text-gray-500">
                  Provide the hospital and complete address.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {/* Hospital */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Hospital Name
                </label>

                <div className="relative">
                  <Hospital
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    name="hospitalName"
                    type="text"
                    placeholder="Dhaka Medical College Hospital"
                    className="h-14 w-full rounded-2xl border border-gray-200 pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              {/* Address */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Address
                </label>

                <textarea
                  name="hospitalAddress"
                  rows="2"
                  placeholder="Enter complete address..."
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-6 border-t border-dashed border-gray-200"></div>

          {/* Donation Information */}

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3">
                <CalendarDays className="text-green-600" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Donation Information
                </h2>

                <p className="text-sm text-gray-500">
                  Select blood group, date and preferred time.
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Blood Group */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Blood Group
                </label>

                <div className="relative">
                  <Droplets
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                  />

                  <select
                    name="bloodGroup"
                    className="h-14 w-full appearance-none rounded-2xl border border-gray-200 pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  >
                    <option>Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>
              </div>

              {/* Date */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Donation Date
                </label>

                <input
                  required
                  name="donationDate"
                  type="date"
                  className="h-14 w-full rounded-2xl border border-gray-200 pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                />
              </div>

              {/* Time */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Donation Time
                </label>

                <div className="relative">
                  <Clock3
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    required
                    name="donationTime"
                    type="time"
                    className="h-14 w-full rounded-2xl border border-gray-200 pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}

          <div className="my-6 border-t border-dashed border-gray-200"></div>

          {/* Message */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Request Message
            </label>

            <textarea
              name="requestMessage"
              rows="4"
              placeholder="Describe why the blood is needed..."
              className="w-full rounded-2xl border border-gray-200 p-5 outline-none transition resize-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          {/* Footer */}

          <div className="mt-4 flex flex-col gap-5 border-t border-gray-100 pt-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-gray-500">
              Please review all information before submitting the donation
              request.
            </p>

            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
              className="rounded-2xl bg-linear-to-r from-red-600 to-rose-500 h-14 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(220,38,38,0.35)]"
            >
              {isLoading ? (
                <span>
                  <Spinner color="danger" />
                  Creating...
                </span>
              ) : (
                "❤️ Create Donation Request"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonationRequestForm;
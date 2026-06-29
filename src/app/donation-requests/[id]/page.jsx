"use client";

import Loading from "@/app/loading";
import { DonateModal } from "@/components/ui/DonateModal";
import { authClient } from "@/lib/auth-client";
import { Card, Chip, Button } from "@heroui/react";

import {
  User,
  Mail,
  MapPin,
  Droplets,
  Hospital,
  CalendarDays,
  Clock3,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  

  useEffect(() => {
    if (!id) return;
    const fetchRequest = async () => {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/donation-requests/${id}`,{
          headers: {
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );
      const data = await res.json();
      setRequest(data);
    };

    fetchRequest();
  }, [id]);

  if (!request) {
    return <Loading />;
  }

  console.log(request);

  const statusColor = {
    pending: "warning",
    inprogress: "accent",
    done: "success",
    canceled: "danger",
  };

  console.log(request.status);

  return (
    <section className="min-h-screen bg-linear-to-b from-rose-50 via-white to-slate-50">
      {/* Hero */}

      <div className="relative overflow-hidden bg-linear-to-r from-red-600 via-rose-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <Button variant="light" className="text-white mb-8">
            <ArrowLeft size={18} />
            Back
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="uppercase tracking-[6px] text-red-100 text-xs font-semibold">
                Blood Donation
              </p>

              <h1 className="text-5xl font-black text-white mt-2">
                Request Details
              </h1>

              <p className="text-red-100 mt-3 max-w-xl leading-7">
                Review the request information carefully before accepting this
                blood donation request.
              </p>
            </div>

            <Chip
              color={statusColor[request.status]}
              variant="primary"
              className="capitalize px-4 py-3 text-base font-bold self-start lg:self-center"
            >
              {request.status}
            </Chip>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blood Group */}

          <Card
            shadow="lg"
            className="bg-linear-to-br from-red-500 via-rose-500 to-red-600 text-white border-none"
          >
            <Card.Content className="flex flex-row gap-3 h-full p-4 items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur">
                <Droplets size={34} />
              </div>
              <div>
                <h2 className="text-3xl font-black mt-3">
                  {request.bloodGroup}
                </h2>
                <p className="text-red-100 mt-2">Required Blood</p>
              </div>
            </Card.Content>
          </Card>

          {/* Requester */}

          <Card shadow="lg" className="rounded-3xl">
            <Card.Content className="p-4">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center">
                  <User size={38} className="text-red-600" />
                </div>

                <div>
                  <p className="text-default-500 uppercase tracking-widest text-xs">
                    Requester
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {request.requesterName}
                  </h2>

                  <div className="flex items-center gap-2 mt-2">
                    <Mail size={16} />

                    {request.requesterEmail}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Hospital */}

          <Card shadow="lg" className="rounded-3xl">
            <Card.Content className="p-4">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Hospital size={30} className="text-red-600" />
                </div>

                <div className="flex-1">
                  <p className="uppercase tracking-widest text-xs text-default-500">
                    Hospital Information
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {request.hospitalName}
                  </h2>

                  <div className="flex items-center gap-2 mt-3 text-xs text-default-600">
                    <MapPin size={17} />

                    {request.hospitalAddress}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
          {/* Location */}

          <Card shadow="lg" className="rounded-3xl">
            <Card.Content className="p-6 h-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <MapPin className="text-red-600" size={24} />
                </div>

                <div>
                  <p className="uppercase tracking-widest text-xs text-default-500">
                    Recipient Location
                  </p>

                  <h3 className="text-xl font-bold">
                    {request.recipientDistrict} District
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <InfoItem
                  icon={<User size={18} />}
                  label="Recipient"
                  value={request.recipientName}
                />

                <InfoItem
                  icon={<MapPin size={18} />}
                  label="Upazila"
                  value={request.recipientUpazila}
                />
              </div>
            </Card.Content>
          </Card>

          {/* Date & Time */}

          <div className="space-y-4">
            <Card shadow="lg" className="rounded-3xl">
              <Card.Content className="p-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                    <Phone className="text-red-600" size={26} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-default-500">
                      Phone Number
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {request?.phone || "01794122785"}
                    </h3>
                  </div>
                </div>
              </Card.Content>
            </Card>
            <Card shadow="lg" className="rounded-3xl">
              <Card.Content className="p-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                    <CalendarDays className="text-red-600" size={26} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-default-500">
                      Donation Date
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {request.donationDate}
                    </h3>
                  </div>
                </div>
              </Card.Content>
            </Card>

            <Card shadow="lg" className="rounded-3xl">
              <Card.Content className="p-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Clock3 className="text-blue-600" size={26} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-default-500">
                      Donation Time
                    </p>

                    <h3 className="text-xl font-bold mt-1">
                      {request.donationTime}
                    </h3>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Request Message */}

          <Card shadow="lg" className="rounded-3xl border border-red-100">
            <Card.Content className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Mail className="text-red-600" size={22} />
                </div>

                <div>
                  <p className="uppercase tracking-widest text-xs text-default-500">
                    Request Message
                  </p>

                  <h3 className="text-xl font-bold">Donation Note</h3>
                </div>
              </div>

              <div className="rounded-2xl bg-linear-to-r from-red-50 to-rose-50 border border-red-100 p-6">
                <p className="italic text-default-700 leading-8 text-lg">
                  {request.requestMessage}
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="mt-10 flex justify-end">
          <DonateModal id={request._id} status={request.status} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Info Item ---------- */

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-default-100 p-4 hover:bg-default-50 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-default-100 flex items-center justify-center">
          {icon}
        </div>

        <span className="text-default-500">{label}</span>
      </div>

      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

 
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Droplets,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { getDonationRequests } from "@/lib/actions/requests";
import { useEffect, useState } from "react";


export default function EmergencyRequests() {
const [requests, setRequests] = useState([]);

useEffect(() => {
  async function loadRequests() {
    const donationRequests = await getDonationRequests();
    setRequests(donationRequests.slice(0, 3));
  }

  loadRequests();
}, []);

  return (
    <section className="bg-[#FFFDFD] pt-16 pb-40">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            EMERGENCY REQUESTS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 lg:text-5xl">
            Blood Needed
            <span className="text-red-600"> Right Now</span>
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Every minute matters. Respond to urgent blood requests and become
            someone's hero today.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {requests.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.2,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-lg transition-all hover:shadow-2xl"
            >
              {/* Top */}

              <div className="relative h-28 bg-linear-to-r from-red-600 via-red-500 to-pink-500">
                <div className="absolute right-6 top-6 rounded-full bg-white/20 px-5 py-2 backdrop-blur-lg">
                  <span className="font-bold text-white">
                    {item.bloodGroup}
                  </span>
                </div>

                <div className="absolute bottom-0 left-8 translate-y-1/2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-red-100">
                    <Droplets size={34} className="text-red-600" />
                  </div>
                </div>
              </div>

              {/* Body */}

              <div className="px-8 pb-8 pt-14">
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.recipientName}
                </h3>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <MapPin size={18} className="text-red-500" />

                    {item.recipientDistrict}
                  </div>

                  <div className="flex items-center gap-3 text-gray-500">
                    🏥 {item.hospitalName}
                  </div>

                  <div className="flex items-center gap-3 text-gray-500">
                    <CalendarDays size={18} className="text-red-500" />

                    {item.donationDate}
                  </div>

                  <div className="flex items-center gap-3 text-gray-500">
                    <Clock3 size={18} className="text-red-500" />

                    {item.donationTime}
                  </div>
                </div>

                <Link
                  href={`/donation-requests/${item._id}`}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition group-hover:gap-3"
                >
                  View Details
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Glow */}

              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/donation-requests"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
          >
            View All Requests
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

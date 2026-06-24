'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Droplets,
  MapPin,
  ArrowRight,
} from "lucide-react";


const DonationRequestCard = ({item, index}) => {
    const {
      _id,
      recipientName,
      recipientDistrict,
      hospitalName,
      donationDate,
      donationTime,
      bloodGroup,
      status,
    } = item;
  return (
    <div>
      <motion.div
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
          {/* bloodGroup */}
          <div className="absolute right-6 top-6 rounded-full bg-white/20 px-5 py-2 backdrop-blur-lg">
            <span className="font-bold text-white">{bloodGroup}</span>
          </div>

          {/* Status */}
          <div className="absolute left-6 top-6 rounded-full bg-yellow-500/80 px-3 py-1 backdrop-blur-lg">
            <span className="font-bold text-white text-xs">
              {status?.[0]?.toUpperCase() + status?.slice(1)}
            </span>
          </div>

          <div className="absolute bottom-0 left-8 translate-y-1/2">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-red-100">
              <Droplets size={34} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Body */}

        <div className="px-8 pb-6 pt-14">
          <div className="">
            <h3 className="text-xl font-bold text-gray-900">{recipientName}</h3>
            <span className="text-xs text-muted">Recipient</span>
          </div>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={18} className="text-red-500" />

              {recipientDistrict}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              🏥 {hospitalName}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <CalendarDays size={18} className="text-red-500" />

              {donationDate}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <Clock3 size={18} className="text-red-500" />

              {donationTime}
            </div>
          </div>

          {/* Button */}

          <Link
            href={`/donation-requests/${_id}`}
            className="mt-4 inline-flex items-center gap-2 font-semibold text-red-600 transition group-hover:gap-3"
          >
            View Details
            <ArrowRight size={18} />
          </Link>
        </div>
        {/* Glow */}

        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
};

export default DonationRequestCard;

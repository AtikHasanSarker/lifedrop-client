"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Mail } from "lucide-react";
import { Avatar, Button, Chip } from "@heroui/react";
import Image from "next/image";

const DonorCard = ({ item, index }) => {
  const {
    _id,
    name,
    email,
    phone,
    image,
    district,
    upazila,
    bloodGroup,
    status,
  } = item;

  const statusColor = {
    pending: "warning",
    inprogress: "accent",
    done: "success",
    canceled: "danger",
  };

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
          <Chip
            color={statusColor[status]}
            variant="primary"
            className="absolute left-6 top-6 rounded-full capitalize px-2 py-1 text-xs font-bold"
          >
            {status}
          </Chip>

          <div className="absolute bottom-0 left-[30%] translate-y-1/2">
            <Avatar className="w-25 h-25 rounded-full border-4 border-white bg-red-100">
              <Avatar.Image alt={name} src={image} />
              <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
            </Avatar>
          </div>
        </div>

        {/* Body */}

        <div className="px-8 pb-6 pt-14">
          <div className="">
            <h3 className="text-xl font-bold text-gray-900 text-center">
              {name}
            </h3>
          </div>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={18} className="text-red-500" />
              {upazila}, {district}
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <Mail size={18} className="text-red-500" />
              {email}
            </div>
          </div>

          {/* Button */}

          <a href={`tel:${phone}`}>
            <Button variant="danger" className="mt-4 inline-flex items-center gap-2 font-semibold transition hover:bg-red-700 group-hover:gap-3 h-12 w-full rounded-2xl">
              Contact Now
              <ArrowRight size={18} />
            </Button>
          </a>
        </div>
        {/* Glow */}

        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-100 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />
      </motion.div>
    </div>
  );
};

export default DonorCard;

"use client";

import { motion } from "framer-motion";
import { Users, Droplets, HeartHandshake, Building2 } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10,000+",
    title: "Registered Donors",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: Droplets,
    number: "5,200+",
    title: "Blood Requests",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: HeartHandshake,
    number: "4,850+",
    title: "Lives Saved",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Building2,
    number: "65+",
    title: "Partner Hospitals",
    color: "bg-blue-100 text-blue-600",
  },
];

export default function Statistics() {
  return (
    <section className="py-30 bg-[#FFFDFD]">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            Our Impact
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 lg:text-5xl leading-15">
            <span> Together We Are Saving</span>
            <br />
            <span className="text-red-600"> Thousands of Lives</span>
          </h2>

          <p className="mt-5 text-gray-500 text-lg">
            Every blood donation makes a difference. Our growing community of
            donors helps patients receive life-saving blood when they need it
            most.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={32} />
                </div>

                <h3 className="text-4xl font-bold text-gray-900">
                  {item.number}
                </h3>

                <p className="mt-3 text-gray-500">{item.title}</p>

                <div className="mt-8 h-1 w-0 rounded-full bg-red-600 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

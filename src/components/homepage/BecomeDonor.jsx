"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse } from "lucide-react";

export default function BecomeDonor() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-rose-500" />

      {/* Blur */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="relative container mx-auto px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-white backdrop-blur-md">
              ❤️ Become a Lifesaver
            </span>

            <h2 className="mt-8 text-5xl font-extrabold leading-tight text-white">
              Your One Donation
              <br />
              Can Save
              <span className="text-red-200"> Three Lives</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-red-100">
              Join thousands of volunteers who donate blood regularly and help
              patients during emergencies. Every drop matters.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Join As Donor
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/donation-requests"
                className="inline-flex items-center rounded-full border border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                View Requests
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Circle */}
            <div className="absolute h-[420px] w-[420px] rounded-full bg-white/10 blur-2xl" />

            {/* Main Icon */}
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
              <HeartPulse size={120} className="text-white" />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute left-0 top-10 rounded-3xl bg-white p-5 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-red-600">10K+</h3>

              <p className="text-sm text-gray-500">Active Donors</p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-6 right-0 rounded-3xl bg-white p-5 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-red-600">❤️ 4850+</h3>

              <p className="text-sm text-gray-500">Lives Saved</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

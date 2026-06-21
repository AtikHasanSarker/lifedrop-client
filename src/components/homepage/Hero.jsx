"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white md:pb-20">
      {/* Background Blur */}
      <div className="absolute -left-44 -top-44 h-[420px] w-[420px] rounded-full bg-red-100 blur-3xl opacity-70" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-rose-100 blur-3xl opacity-70" />
      {/* Floating Blur */}
      <div className="absolute left-20 top-40 h-40 w-40 rounded-full bg-red-200 opacity-40 blur-3xl" />

      <div className="absolute right-20 bottom-32 h-52 w-52 rounded-full bg-pink-200 opacity-40 blur-3xl" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-linear(circle,#dc2626_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid min-h-[90vh] items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            className="py-10 lg:py-20 z-10"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2 text-sm font-medium text-red-600">
              <HeartHandshake size={18} />
              Trusted Blood Donation Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              Donate Blood.
              <br />
              <span className="bg-gradient-to-r from-red-700 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Save Lives.
              </span>
              <br />
              Be Someone's Hero.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
              LifeDrop connects voluntary blood donors with patients who
              urgently need blood. Together we can save lives through one simple
              act of kindness.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-red-700 hover:shadow-[0_20px_40px_rgba(220,38,38,0.35)]"
              >
                Join As Donor
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-2 rounded-full border-2 border-red-600 px-8 py-4 font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-50 hover:shadow-lg"
              >
                <Search size={18} />
                Search Donors
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Circle */}
            <div className="absolute h-[520px] w-[520px] rounded-full bg-linear-to-br from-red-100 via-red-50 to-white" />

            {/* Image */}
            <Image
              src="/images/hero2.webp"
              alt="Blood Donation"
              width={700}
              height={700}
              priority
              className="relative z-10 w-full rounded-3xl max-w-[620px] drop-shadow-[0_35px_35px_rgba(220,38,38,0.15)]"
            />
            {/* Floating Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -left-2 top-10 z-20 hidden w-60 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                  ❤️
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-red-600">10,000+</h3>

                  <p className="text-sm text-gray-500">Registered Donors</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute bottom-8 right-0 z-20 hidden w-64 rounded-3xl border border-white/40 bg-white/80 p-5 shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  🩸
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Emergency Match
                  </h3>

                  <p className="text-sm text-gray-500">
                    Average response within 15 minutes
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: 1,
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute right-16 -top-8 z-20 hidden rounded-2xl bg-red-600 px-5 py-4 text-white shadow-xl lg:flex"
            >
              <div>
                <h2 className="text-3xl font-bold">98%</h2>

                <p className="text-sm">Successful Donation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

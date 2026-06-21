"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, HeartHandshake, HeartPulse } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create Account",
    description:
      "Register as a donor by completing your profile with blood group and location.",
    icon: UserPlus,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "02",
    title: "Find Blood Requests",
    description:
      "Browse active emergency requests or search for donors near your location.",
    icon: Search,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "03",
    title: "Donate Blood",
    description: "Accept a request and donate blood safely to someone in need.",
    icon: HeartHandshake,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "04",
    title: "Save a Life",
    description:
      "Every successful donation creates hope and saves precious lives.",
    icon: HeartPulse,
    color: "bg-pink-100 text-pink-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background Blur */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-red-100 blur-3xl opacity-50" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-pink-100 blur-3xl opacity-40" />

      <div className="container mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 lg:text-5xl">
            Donate Blood in
            <span className="text-red-600"> 4 Simple Steps</span>
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            LifeDrop makes blood donation fast, secure and simple. Follow these
            four easy steps to become someone's lifesaver.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Desktop Line */}
          <div className="absolute left-0 right-0 top-16 hidden h-1 bg-red-100 lg:block" />

          <div className="grid gap-12 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -12,
                  }}
                  className="relative"
                >
                  {/* Number */}
                  <div className="absolute right-0 top-0 text-6xl font-black text-red-50">
                    {step.id}
                  </div>

                  <div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition hover:shadow-2xl">
                    {/* Icon */}
                    <div
                      className={`mb-6 flex h-20 w-20 items-center justify-center rounded-3xl ${step.color}`}
                    >
                      <Icon size={36} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-500">
                      {step.description}
                    </p>

                    <div className="mt-8 h-1 w-0 rounded-full bg-red-600 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

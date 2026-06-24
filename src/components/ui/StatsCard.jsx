"use client";

import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-red-100",
  iconColor = "text-red-500",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">{value}</h2>

          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}

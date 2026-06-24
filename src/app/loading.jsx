"use client";

import { Droplets } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-100">
      {/* Background Blur */}

      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-red-300/20 blur-3xl animate-pulse" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl animate-pulse" />

      <div className="relative flex w-[360px] flex-col items-center">
        {/* Logo */}

        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-red-300 opacity-30"></div>

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl shadow-red-400/30">
            <Droplets size={42} className="animate-bounce text-white" />
          </div>
        </div>

        {/* Title */}

        <h1 className="mt-8 text-4xl font-black tracking-tight">
          <span className="text-gray-900">Life</span>
          <span className="text-red-600">Drop</span>
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Preparing Donation Request...
        </p>

        {/* Progress */}

        <div className="mt-10 h-3 w-full overflow-hidden rounded-full bg-red-100">
          <div className="loading-bar h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600"></div>
        </div>

        <p className="mt-5 text-sm font-medium text-gray-400">
          Saving Lives, One Drop at a Time ❤️
        </p>
      </div>
    </div>
  );
}

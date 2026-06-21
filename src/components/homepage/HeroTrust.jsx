"use client";

import { ShieldCheck, Clock3, HeartHandshake, Users } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Verified Donors",
    description: "Every donor profile is verified for safer donations.",
  },
  {
    icon: Clock3,
    title: "24/7 Emergency",
    description: "Find blood donors anytime during emergencies.",
  },
  {
    icon: HeartHandshake,
    title: "Fast Matching",
    description: "Quickly connect with nearby compatible donors.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Thousands of volunteers helping every day.",
  },
];

export default function HeroTrust() {
  return (
    <section className="relative -mt-16 z-20 bg-white">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid gap-6 rounded-[32px] border border-red-100 bg-white p-8 shadow-2xl md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Icon size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

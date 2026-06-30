"use client";

import { useEffect, useState } from "react";
import { Card, Chip, Spinner } from "@heroui/react";
import { Droplets, DollarSign, Users, TrendingUp } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminDashboard() {
  
  const [stats, setStats] = useState({
  donors: 0,
  requests: 0,
  totalFunding: 0,
  });
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  
  const user = session?.user;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    async function loadData() {
      try {
        const { data: tokenData } = await authClient.token();
        const headers = {
          Authorization: `Bearer ${tokenData.token}`,
        };
        const res = await fetch(`${baseUrl}/dashboard-stats`, {
          headers
        });

        const stats = await res.json();

        setStats({
          donors: stats.totalDonors,
          requests: stats.totalRequests,
          totalFunding: stats.totalFunding,
        });

      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const cards = [
    {
      title: "Total Donors",
      value: stats.donors,
      icon: <Users size={22} className="text-primary" />,
      bg: "bg-primary/10",
      chip: "+12%",
    },
    {
      title: "Total Funding",
      value: `$${stats.totalFunding.toLocaleString()}`,
      icon: <DollarSign size={22} className="text-success" />,
      bg: "bg-success/10",
      chip: "+5%",
    },
    {
      title: "Blood Requests",
      value: stats.requests,
      icon: <Droplets size={22} className="text-danger" />,
      bg: "bg-danger/10",
      chip: "+8%",
    },
  ];

  return (
    <section className="space-y-6 px-6">
      <div>
        <h1 className="text-4xl font-black">
          Hello, <span className="text-danger">{user?.name}!</span>
        </h1>

        <p className="text-default-500 mt-2">
          Manage your activities and help save lives today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card
            key={card.title}
            shadow="sm"
            className="border border-default-100"
          >
            <Card.Content className="space-y-8 p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`h-14 w-14 rounded-2xl ${card.bg} flex items-center justify-center`}
                >
                  {card.icon}
                </div>

                <Chip
                  color="success"
                  variant="flat"
                  startContent={<TrendingUp size={14} />}
                >
                  {card.chip}
                </Chip>
              </div>

              <div>
                <p className="text-default-500 font-medium">{card.title}</p>

                {loading ? (
                  <Spinner size="sm" className="mt-3" />
                ) : (
                  <h2 className="text-5xl font-black mt-2">{card.value}</h2>
                )}
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}

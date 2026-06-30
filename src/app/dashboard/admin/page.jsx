"use client";

import { useEffect, useState } from "react";
import { Button, Card, Chip, Spinner } from "@heroui/react";
import { Droplets, DollarSign, Users, TrendingUp, Syringe } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import RequestTable from "@/components/dashboard/RequestTable";
import Link from "next/link";
import { getMyDonationRequests } from "@/lib/actions/requests";

export default function AdminDashboard() {
  const [myRequests, setMyRequests] = useState([]);
  console.log(myRequests);
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
    if (!user?.id) return;
    async function loadData() {
      try {
        const { data: tokenData } = await authClient.token();
        if (!tokenData) return;
        const headers = {
          Authorization: `Bearer ${tokenData.token}`,
        };
        const res = await fetch(`${baseUrl}/dashboard-stats`, {
          headers,
        });
        const donationRequests = await getMyDonationRequests(user.id);

        const requests = Array.isArray(donationRequests)
          ? donationRequests.slice(0, 3)
          : [];

        const stats = await res.json();
        setMyRequests(requests);

        setStats({
          donors: stats.totalDonors,
          requests: stats.totalRequests,
          totalFunding: stats.totalFunding,
        });
      } catch (err) {
        console.error("error fetching stats");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, baseUrl]);

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

      <div className="mt-10 min-h-screen">
        {myRequests?.length > 0 ? (
          <RequestTable donationRequests={myRequests} />
        ) : (
          <div className="w-full rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 flex flex-col items-center justify-center">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
              <Syringe className="h-8 w-8 text-gray-400" />
            </div>

            <h3 className="text-2xl font-bold text-gray-400">
              No Recent Requests
            </h3>
          </div>
        )}
        <div className="flex justify-center">
          <Link href={`/dashboard/${user?.role}/my-requests`}>
            <Button className="mt-10 h-14 rounded-2xl bg-red-600 hover:bg-red-700 px-10 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
              <Droplets /> View All Requests
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

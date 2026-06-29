import RequestTable from "@/components/dashboard/RequestTable";
import StatsCard from "@/components/ui/StatsCard";
import { getMyDonationRequests } from "@/lib/actions/requests";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import {
  Droplets,
  Heart,
  BadgePlus,
  CalendarDays,
  Syringe,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const VolunteerDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user?.id) return;

  const donationRequests = await getMyDonationRequests(user.id);

  const requests = Array.isArray(donationRequests)
    ? donationRequests.slice(0, 3)
    : [];
  return (
    <div>
      <div>
        <h1 className="text-4xl font-black">
          Hello, <span className="text-danger">{user.name}!</span>
        </h1>

        <p className="text-default-500 mt-2">
          Manage your activities and help save lives today.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-5">
        <StatsCard
          title="Total Donations"
          value={donationRequests?.length}
          subtitle="Keep it up! 🎉"
          icon={<Droplets size={30} />}
          iconBg="bg-red-100"
          iconColor="text-red-500"
        />

        <StatsCard
          title="Lives Impacted"
          value="24"
          subtitle="Amazing! ❤️"
          icon={<Heart size={30} />}
          iconBg="bg-pink-100"
          iconColor="text-pink-500"
        />

        <StatsCard
          title="Blood Group"
          value={user.bloodGroup}
          subtitle="Universal Helper"
          icon={<BadgePlus size={30} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-500"
        />

        <StatsCard
          title="Member Since"
          value={new Date(user?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          icon={<CalendarDays size={30} />}
          iconBg="bg-green-100"
          iconColor="text-green-500"
        />
      </div>

      <div className="mt-10 min-h-screen">
        {donationRequests?.length > 0 ? (
          <RequestTable donationRequests={requests} />
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
          <Link href={`/dashboard/${user.role}/my-requests`}>
            <Button className="mt-10 h-14 rounded-2xl bg-red-600 hover:bg-red-700 px-10 text-sm font-bold uppercase tracking-wider text-white shadow-lg">
              <Droplets /> View All Requests
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;

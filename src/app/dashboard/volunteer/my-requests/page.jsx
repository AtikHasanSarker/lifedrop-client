import RequestTable from "@/components/dashboard/RequestTable";
import { getMyDonationRequests } from "@/lib/actions/requests";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyDonationRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user?.id) return;

  const donationRequests = await getMyDonationRequests(user.id);

  return (
    <div className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {donationRequests?.length > 0 ? (
        <RequestTable donationRequests = {donationRequests} />
      ) : (
        <div className="flex min-h-[40vh] items-center justify-center">
          <h3 className="text-2xl font-semibold text-center">
            No Recent Donation Requests.
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequestsPage;

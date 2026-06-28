import PublicRequestTable from "@/components/dashboard/PublicRequestTable";
import { getDonationRequests } from "@/lib/actions/requests";

const AllDonationRequestsPage = async () => {
  const donationRequests = await getDonationRequests();

  return (
    <div className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {donationRequests?.length > 0 ? (
        <PublicRequestTable donationRequests={donationRequests} />
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

export default AllDonationRequestsPage;

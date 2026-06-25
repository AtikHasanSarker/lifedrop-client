import DonationRequestCard from "@/components/ui/DonationRequestCard";
import { getDonationRequests } from "@/lib/actions/requests";

const DonationRequestsPage = async () => {
  const donationRequests = await getDonationRequests();
  const pendingRequests = donationRequests.filter(i => i.status === 'pending')
  return (
    <section className="bg-[#FFFDFD] py-20">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">
            Donation <span className="text-red-600">Requests</span>
          </h2>
          <p>Browse all active donation requests and help save lives today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pendingRequests.map((item, index) => (
            <DonationRequestCard key={item._id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationRequestsPage;

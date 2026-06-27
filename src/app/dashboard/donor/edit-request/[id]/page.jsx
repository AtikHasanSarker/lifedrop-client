import DonationRequestForm from "@/components/dashboard/DonationRequestForm";
import EditDonationRequestForm from "@/components/dashboard/EditRequestForm";
import { getDonationRequestById } from "@/lib/actions/requests";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EditDonationRequest({ params }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const donationRequest = await getDonationRequestById(id);

  return (
    <section className="min-h-screen bg-[#FAFAFA] p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Edit Blood Donation Request
        </h1>
      </div>

      {/* Card */}
      <EditDonationRequestForm user={user} id={id} donationRequest={donationRequest} />
    </section>
  );
}

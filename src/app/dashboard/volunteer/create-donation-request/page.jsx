import DonationRequestForm from "@/components/dashboard/DonationRequestForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateDonationRequest() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  const user = session?.user;

  if (user.status !== "active") {
    redirect(`/dashboard/${user.role}`);
  }

  return (
    <section className="min-h-screen bg-[#FAFAFA] p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Create Blood Donation Request
        </h1>

        <p className="mt-3 text-gray-500">
          Fill in the recipient information carefully before submitting your
          request.
        </p>
      </div>

      {/* Card */}
      <DonationRequestForm user={user} />
    </section>
  );
}

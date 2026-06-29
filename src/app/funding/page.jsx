import FundingTable from "@/components/ui/FundingTable";
import GiveFundModal from "@/components/ui/GiveFundModal";
import { getFunding } from "@/lib/actions/requests";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Funding – LifeDrop",
  description:
    "Support LifeDrop by donating any amount. Your contribution helps fund blood donation activities and saves lives.",
};

export default async function FundingPage() {
   const { token } = await auth.api.getToken({
     headers: await headers(),
   });
  const funds = await getFunding(token);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-center">Funding <span className="text-red-600">History</span></h1>
          <p className="text-default-500 max-w-xl mt-6 text-center">Support LifeDrop by donating. Your contribution helps fund blood donation activities and saves lives.</p>
        </div>

        <div className="mt-8 flex-end">
          <GiveFundModal />
        </div>

        <div className="py-10">
          <FundingTable funds={funds} />
        </div>
      </div>
    </div>
  );
}

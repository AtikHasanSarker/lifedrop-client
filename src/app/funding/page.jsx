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
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="mb-6 flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full">
          <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Funding <span className="text-red-600">History</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-default-500 sm:mt-6 sm:text-base">
            Support LifeDrop by donating. Your contribution helps fund blood donation activities and saves lives.
          </p>
        </div>

        <div className="flex justify-center">
          <GiveFundModal />
        </div>

        <div className="w-full py-3 sm:py-10">
          <FundingTable funds={funds} />
        </div>
      </div>
    </div>
  );
}

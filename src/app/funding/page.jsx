// import FundingTable from "@/components/ui/FundingTable";
import GiveFundModal from "@/components/ui/GiveFundModal";


export default function FundingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Funding</h1>

          <p className="text-default-500">Support LifeDrop by donating.</p>
        </div>

        <div>
          <GiveFundModal />
        </div>
      </div>
      {/* <FundingTable /> */}
    </div>
  );
}

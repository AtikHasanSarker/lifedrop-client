'use client';

import { useState } from "react";
import Select from "@/components/ui/Select";
import { Button, Spinner } from "@heroui/react";
import { Search } from "lucide-react";
import { districts, districtUpazilas } from "../data/DistrictUpazilas";
import DonationRequestCard from "@/components/ui/DonationRequestCard";
import toast from "react-hot-toast";

const SearchPage = () => {
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    console.log(searchResults);

    const bloodGroups = [
      { value: "A+", label: "A+" },
      { value: "A-", label: "A-" },
      { value: "B+", label: "B+" },
      { value: "B-", label: "B-" },
      { value: "AB+", label: "AB+" },
      { value: "AB-", label: "AB-" },
      { value: "O+", label: "O+" },
      { value: "O-", label: "O-" },
    ];

    const handleSearch = async (e) => {
      e.preventDefault();
      
      const formData = new FormData(e.target);
      const bloodGroup = formData.get("bloodGroup");
      const district = formData.get("district");
      const upazila = formData.get("upazila");
      
      setIsLoading(true);
      setHasSearched(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`,
        );

        const result = await res.json();

        setSearchResults(result.data);

        if (result.data.length === 0) {
          toast.success("No donors found");
        } else {
          toast.success(`Found ${result.data.length} donor(s)`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="space-y-8">
        <div>
          <section className="relative -mt-6 z-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="relative overflow-hidden rounded-[32px] border border-danger-100/60 bg-white shadow-[0_20px_60px_rgba(239,68,68,0.08)]">
                {/* Background Decoration */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-danger-100/40 blur-3xl" />
                <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-rose-100/40 blur-3xl" />

                <form onSubmit={handleSearch} className="relative p-6 lg:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-end">
                    {/* Blood Group */}
                    <Select
                      required
                      label="Blood Group"
                      name="bloodGroup"
                      options={bloodGroups}
                      placeholder="Select Blood Group"
                    />

                    {/* District + Upazila */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <Select
                        required
                        label="District"
                        name="district"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        options={districts}
                        placeholder="Select District"
                      />

                      <Select
                        required
                        label="Upazila"
                        name="upazila"
                        options={districtUpazilas[selectedDistrict] || []}
                        placeholder="Select Upazila"
                      />
                    </div>

                    {/* Search Button */}
                    <Button
                      color="danger"
                      size="lg"
                      radius="lg"
                      type="submit"
                      isLoading={isLoading}
                      startContent={!isLoading && <Search size={20} />}
                      className="h-14 font-bold text-base shadow-lg shadow-danger-500/20"
                    >
                      {isLoading ? "Searching..." : "Search Donors"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="max-w-7xl mx-auto px-4 pb-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size="lg" color="danger" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="container mx-auto px-6 lg:px-10">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold mb-4">
                    Donation <span className="text-red-600">Requests</span>
                  </h2>
                  <p>
                    Browse all active donation requests and help save lives
                    today.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((item, index) => (
                    <DonationRequestCard
                      key={item._id}
                      item={item}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No donation requests found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default SearchPage;
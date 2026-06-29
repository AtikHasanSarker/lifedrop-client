'use client';

import { useState } from "react";
import Select from "@/components/ui/Select";
import { Button, Card, Chip, Spinner } from "@heroui/react";
import { Droplets, HeartHandshake, Search } from "lucide-react";
import { districts, districtUpazilas } from "../data/DistrictUpazilas";
import toast from "react-hot-toast";
import DonorCard from "@/components/ui/DonorCard";

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


    const onSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);

      try {
        const formData = new FormData(e.target);

        const params = new URLSearchParams({
          bloodGroup: formData.get("bloodGroup"),
          district: formData.get("district"),
          upazila: formData.get("upazila"),
        });

        console.log(params);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/search-donors?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to search donors");
        }

        const donors = await response.json();

        setSearchResults(donors);
        setHasSearched(true)
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      } finally {
        setIsLoading(false);

      }
    };
   
    return (
      <div>
        <section className="relative overflow-hidden py-10">
          {/* Background */}

          <div className="absolute inset-0 -z-10 bg-linear-to-b from-red-50 via-white to-white" />

          <div className="container mx-auto px-4 text-center">
            <Chip
              color="danger"
              variant="flat"
              startContent={<HeartHandshake size={16} />}
              className="px-3 py-5 font-semibold"
            >
              12,450+ Verified Donors Across Bangladesh
            </Chip>

            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight">
              Find a <span className="text-danger">Blood Donor</span>
            </h1>

            <p className="mt-4 max-w-3xl mx-auto text-default-500 leading-8">
              Search by blood group and location to quickly find someone who can
              help save a life.
            </p>
          </div>
          <div className="container mx-auto px-4 mt-6">
            <form onSubmit={onSubmit} className="relative p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-4 gap-6 justify-between items-end">
                {/* Blood Group */}
                <Select
                  required
                  label="Blood Group"
                  name="bloodGroup"
                  options={bloodGroups}
                  placeholder="Select Blood Group"
                />

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

                {/* Search Button */}
                <Button
                  color="danger"
                  size="lg"
                  radius="lg"
                  type="submit"
                  isLoading={isLoading}
                  startContent={!isLoading && <Search size={20} />}
                  className="h-14 font-bold rounded-xl text-base shadow-lg shadow-danger-500/20 hover:bg-red-600 px-6"
                >
                  {isLoading ? "Searching..." : "Search Donors ❤️"}
                </Button>
              </div>
            </form>
          </div>
          {/* Search Results */}

          <div className="container mx-auto px-4 pb-8">
            {hasSearched ? (
              <>
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Spinner size="lg" color="danger" />
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="container mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {searchResults.map((item, index) => (
                        <DonorCard key={item._id} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center rounded-3xl border border-dashed border-danger-200 bg-gradient-to-br from-red-50 to-white px-6 py-10 mt-4 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger-100">
                      <span className="text-4xl">🩸</span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-gray-800">
                      No Donor Found
                    </h2>

                    <p className="mt-3 max-w-2xl text-gray-500 leading-7">
                      We couldn't find any donors matching your search criteria.
                      Try changing the blood group or selecting another district
                      or upazila.
                    </p>

                    <div className="mt-6 rounded-full bg-danger-50 px-5 py-2 text-sm font-medium text-danger">
                      ❤️ Every search brings hope to someone.
                    </div>
                  </div>
                )}
              </>
            ) : (
              <section className="max-w-5xl mx-auto px-4 py-10">
                <Card
                  shadow="sm"
                  className="rounded-[36px] border-2 border-dashed border-danger-100 bg-gradient-to-br from-red-50 via-white to-white"
                >
                  <Card.Content className="py-10 text-center">
                    <div className="relative mx-auto w-fit">
                      <div className="absolute inset-0 rounded-full bg-red-300/30 blur-2xl animate-pulse" />

                      <div className="relative w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center">
                        <Droplets
                          size={48}
                          className="text-danger animate-bounce"
                        />
                      </div>
                    </div>

                    <h2 className="mt-8 text-4xl font-black">
                      Ready to find a hero?
                    </h2>

                    <p className="mt-4 max-w-lg mx-auto text-default-500 leading-8">
                      Select a blood group, district and upazila, then click Search Donors to discover verified blood donors near you.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-danger-50 px-6 py-3 text-danger font-semibold">
                      ❤️ Every donation has the power to save a life.
                    </div>
                  </Card.Content>
                </Card>
              </section>
            )}
          </div>
        </section>
      </div>
    );
};

export default SearchPage;
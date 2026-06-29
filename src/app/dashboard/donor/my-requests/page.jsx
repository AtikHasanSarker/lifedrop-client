"use client";

import React, { useState, useEffect, useRef } from "react";
import RequestTable from "@/components/dashboard/RequestTable";
import { authClient } from "@/lib/auth-client";
import Pagination from "@/components/shared/Pagination";

const MyDonationRequestsPage = () => {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  const fetchData = async (page) => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
      const res = await fetch(
        `${baseUrl}/my-donation-requests/${user.id}?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch donation requests");
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData(currentPage);
    }
  }, [currentPage, user?.id]);

  if (sessionPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-danger"></div>
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <h3 className="text-2xl font-semibold text-center text-danger">
          Please log in to view your requests.
        </h3>
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={tableRef} className="pt-10 pb-20 h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {loading && !data ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-danger"></div>
        </div>
      ) : error ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-danger mb-4">
              Error loading requests
            </h3>
            <p className="text-default-500 mb-6">{error}</p>
            <button
              onClick={() => fetchData(currentPage)}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            >
              Retry
            </button>
          </div>
        </div>
      ) : data?.data?.length > 0 ? (
        <div className={`transition-all duration-300 ${loading ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
          <RequestTable 
            donationRequests={data.data} 
            onRefresh={() => fetchData(currentPage)} 
          />
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
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

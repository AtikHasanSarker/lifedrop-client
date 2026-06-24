"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const getDonationRequests = async () => {
  const res = await fetch(`${baseUrl}/donation-requests`);
  return res.json();
};

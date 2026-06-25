"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export const getDonationRequests = async () => {
  const res = await fetch(`${baseUrl}/donation-requests`);
  return res.json();
};

export const updateDonationRequest = async (id) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      status: "inprogress",
    }),
  });
  return res.json();
};


export const deleteDonationRequest = async (id) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/all-users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


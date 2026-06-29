"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getDonationRequests = async () => {
  const res = await fetch(`${baseUrl}/donation-requests`);
  return res.json();
};
export const getDonationRequestById = async (id, token) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getMyDonationRequests = async (userId) => {
  const res = await fetch(`${baseUrl}/user-donation-requests/${userId}`);
  return res.json();
};

export const getFunding = async (token) => {
  const res = await fetch(`${baseUrl}/funding`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export const updateDonationRequest = async (id, token) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: "inprogress",
    }),
  });
  return res.json();
};


export const deleteDonationRequest = async (id, token) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};


export const updateUser = async (id, data, token) => {
  const res = await fetch(`${baseUrl}/users/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePublicRequest = async (id, status, token) => {
  const res = await fetch(`${baseUrl}/public-donation-requests/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(status),
  });
  return res.json();
};


"use server";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getDonationRequests = async () => {
  const res = await fetch(`${baseUrl}/donation-requests`);
  return res.json();
};
export const getDonationRequestById = async (id) => {
  const res = await fetch(`${baseUrl}/donation-requests/${id}`);
  return res.json();
};

export const getMyDonationRequests = async (id) => {
  const res = await fetch(`${baseUrl}/my-donation-requests/${id}`);
  return res.json();
}

export const getFunding = async (id) => {
  const res = await fetch(`${baseUrl}/funding`);
  return res.json();
}

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

export const updatePublicRequest = async (id, status) => {
  const res = await fetch(`${baseUrl}/public-donation-requests/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(status),
  });
  return res.json();
};


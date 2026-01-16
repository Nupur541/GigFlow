const API_URL = "http://localhost:5000/api";

export const getGigs = async () => {
  const res = await fetch(`${API_URL}/gigs`);
  return res.json();
};

export const createGig = async (data) => {
  const res = await fetch(`${API_URL}/gigs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchGig();
    fetchBids();
  }, []);

  const fetchGig = async () => {
    const res = await api.get(`/gigs/${id}`);
    setGig(res.data);
  };

  const fetchBids = async () => {
    try {
      const res = await api.get(`/bids/${id}`);
      setBids(res.data);
    } catch {}
  };

  const placeBid = async () => {
    await api.post("/bids", { gigId: id, message, price });
    alert("Bid submitted");
  };

  const hireBid = async (bidId) => {
    await api.patch(`/bids/${bidId}/hire`);
    fetchGig();
    fetchBids();
  };

  if (!gig) return <p className="text-center mt-10">Loading...</p>;

  const isOwner = user && gig.ownerId === user._id;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Gig Info */}
      <div className="border rounded p-6 shadow">
        <h1 className="text-2xl font-bold">{gig.title}</h1>
        <p className="text-gray-600 mt-2">{gig.description}</p>
        <p className="mt-4 font-semibold">Budget: ₹{gig.budget}</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 rounded">
          Status: {gig.status}
        </span>
      </div>

      {/* Freelancer bid section */}
      {!isOwner && gig.status === "open" && (
        <div className="border rounded p-6 space-y-4">
          <h2 className="text-xl font-semibold">Place a Bid</h2>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Your proposal message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Your price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            onClick={placeBid}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit Bid
          </button>
        </div>
      )}

      {/* Client view bids */}
      {isOwner && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Bids Received</h2>

          {bids.length === 0 && <p>No bids yet</p>}

          {bids.map((bid) => (
            <div
              key={bid._id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{bid.message}</p>
                <p className="text-sm text-gray-600">₹ {bid.price}</p>
                <p className="text-sm">Status: {bid.status}</p>
              </div>

              {gig.status === "open" && bid.status === "pending" && (
                <button
                  onClick={() => hireBid(bid._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Hire
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigDetails;

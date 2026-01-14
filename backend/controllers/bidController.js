// backend/controllers/bidController.js

const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

// CREATE A BID
exports.createBid = async (req, res) => {
  try {
    const { gigId, amount, message } = req.body;

    // Check if gig exists
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Create bid
    const bid = await Bid.create({
      gigId,
       freelancerId: req.user.id, // use freelancerId instead of ownerId
       price: amount,   
      message,
      status: "pending",
    });

    res.status(201).json({ message: "Bid created", bid });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET ALL BIDS FOR A GIG
exports.getBidsForGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (!gig.OwnerId) {
      return res.status(400).json({ message: "Gig owner not set" });
    }

    // Find all bids for this gig
    const bids = await Bid.find({ gigId: gig._id }).populate("freelancerId", "name email");

    res.status(200).json({ gig, bids });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// HIRE A BID (set bid status to hired)

exports.hireBid = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);   // 👈 ADD THIS LINE

    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (!gig.OwnerId) {
      return res.status(400).json({ message: "Gig owner not set" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (gig.OwnerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bidId } },
      { $set: { status: "rejected" } }
    );

    bid.status = "hired";
    await bid.save();

    res.status(200).json({
      message: "Bid hired successfully",
      bid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


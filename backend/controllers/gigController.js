const Gig = require("../models/Gig");

/* ================= CREATE GIG ================= */
exports.createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      OwnerId: req.user._id,
    });

    res.status(201).json({ message: "Gig created successfully", gig });
  } catch (error) {
    console.log("CREATE GIG ERROR 👉", error);
    res.status(500).json({ message: "Failed to create gig", error: error.message });
  }
};

/* ================= GET ALL OPEN GIGS ================= */
exports.getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {
      status: "open",
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query).sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    console.error("GET GIGS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch gigs",
      error: error.message,
    });
  }
};
/* ================= TEMP: FIX MISSING OWNER ================= */
exports.fixGigOwner = async (req, res) => {
  try {
    const { gigId, ownerId } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    gig.ownerId = ownerId; // set the owner
    await gig.save();

    res.status(200).json({ message: "Gig owner set", gig });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const express = require("express");
const router = express.Router();
const { createBid, getBidsForGig, hireBid } = require("../controllers/bidController");
const authMiddleware = require("../src/middleware/authMiddleware"); // ✅ default import
// POST /api/bids → submit a bid (protected)
router.post("/", authMiddleware, createBid);
router.get("/gig/:gigId", authMiddleware, getBidsForGig);
router.put("/hire", authMiddleware, hireBid);
router.patch("/:bidId/hire", authMiddleware, hireBid);
module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../src/middleware/authMiddleware");

const {
  createGig,
  getAllGigs,
  fixGigOwner  // ✅ add this here
} = require("../controllers/gigController");
router.post("/", authMiddleware, createGig);
router.get("/", authMiddleware, getAllGigs);

// TEMP route to fix gigs
router.put("/fix-owner",fixGigOwner);
module.exports = router;

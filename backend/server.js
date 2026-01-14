/* ===================== IMPORTS ===================== */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config(); // ✅ correct dotenv usage

/* ===================== EXPRESS APP ===================== */
const app = express();
app.use(express.json());
app.use(cookieParser());

/* ===================== CORS ===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gigflow.vercel.app"
    ],
    credentials: true,
  })
);

/* ===================== ROUTES ===================== */
const authRoutes = require("./routes/auth");
const gigRoutes = require("./routes/gig");
const bidRoutes = require("./routes/bid");

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

/* ===================== TEST ROUTE ===================== */
app.get("/", (req, res) => {
  res.send("GigFlow API is running 🚀");
});

/* ===================== DATABASE CONNECTION ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  });

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

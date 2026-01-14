const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

/* ===================== MIDDLEWARE ===================== */
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

/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection failed ❌", err));

/* ===================== SERVER ===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

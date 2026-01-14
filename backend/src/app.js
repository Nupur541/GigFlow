const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("GigFlow API is running 🚀");
});

module.exports = app;

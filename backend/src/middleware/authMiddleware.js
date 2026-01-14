const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Read token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    next(); // allow request to continue
  } catch (error) {
    console.log("AUTH ERROR 👉", error);
    return res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = authMiddleware;

const { getToken, verifyAccessToken } = require("../utils/token2");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = verifyAccessToken(token);

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { requireAuth };

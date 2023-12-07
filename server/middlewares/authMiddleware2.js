const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { verifyAccessToken } = require("../utils/token2");

const requireAuth = asyncHandler(async (req, res, next) => {
  let token;
  // console.log("token:", token);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log("token:", token);

      const decoded = verifyAccessToken(token);
      // console.log("decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      // console.log("req.user:", req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { requireAuth };

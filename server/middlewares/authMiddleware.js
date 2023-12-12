const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { verifyAccessToken } = require("../utils/token");
const { rolePermissions } = require("../config/roles");

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
      req.role = req.user.role;
      req.permissions = rolePermissions[req.role] || [];

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

const asyncHandler = require("express-async-handler");

const requireRole = (role) => {
  return asyncHandler(async (req, res, next) => {
    if (req.role && req.role === role) {
      next();
    } else {
      res.status(403);
      throw new Error("Forbidden - Insufficient privileges");
    }
  });
};

module.exports = { requireRole };

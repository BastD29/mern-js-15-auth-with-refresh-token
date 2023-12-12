const asyncHandler = require("express-async-handler");

const requirePermission = (permission) => {
  return asyncHandler(async (req, res, next) => {
    if (req.permissions.includes(permission)) {
      next();
    } else {
      res.status(403);
      throw new Error("Forbidden - Insufficient permissions");
    }
  });
};

module.exports = { requirePermission };

const express = require("express");
const { getUsers, getMe } = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware");
const { requireRole } = require("../middlewares/roleMiddleware");
const { requirePermission } = require("../middlewares/permissionMiddleware");
const { permissions } = require("../config/permissions");

const router = express.Router();

// router.get("/", getUsers);
// router.get("/", requireAuth, requireRole("admin"), getUsers);
router.get(
  "/",
  requireAuth,
  requirePermission(permissions.READ_ALL_USERS),
  getUsers
);
router.get("/me", requireAuth, getMe);

module.exports = router;

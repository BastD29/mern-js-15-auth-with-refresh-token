const express = require("express");
const { getUsers, getMe } = require("../controllers/userController");
const { requireAuth } = require("../middlewares/authMiddleware2");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", requireAuth, getMe);

module.exports = router;

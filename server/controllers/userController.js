const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const getMe = asyncHandler(async (req, res) => {
  //   console.log("req:", req);

  const user = req.user;

  res.status(200).json(user);
});

module.exports = { getUsers, getMe };

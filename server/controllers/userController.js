const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { permissions } = require("../config/permissions");

// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find();

//   res.status(200).json(users);
// });

// * Using roles middleware

// const getUsers = asyncHandler(async (req, res) => {
//   if (req.role === "admin") {
//     const users = await User.find();
//     res.status(200).json(users);
//   } else {
//     res.status(403).json({ message: "Access denied" });
//   }
// });

// * Using permissions middleware

const getUsers = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  if (req.permissions.includes(permissions.READ_ALL_USERS)) {
    const users = await User.find();
    res.status(200).json(users);
  } else {
    res.status(403).json({ message: "Access denied" });
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
});

module.exports = { getUsers, getMe };

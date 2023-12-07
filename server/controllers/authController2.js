const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/token2");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  // * using the body to send the refresh token
  const { token: refreshToken } = req.body;
  // console.log("refreshToken:", refreshToken);

  // * using the header to send the refresh token (recommended approach)
  // const authHeader = req.headers.authorization;
  // const refreshToken = authHeader && authHeader.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  const existingToken = await RefreshToken.findOne({ token: refreshToken });
  console.log("existingToken:", existingToken);

  if (!existingToken) {
    return res
      .status(403)
      .json({ message: "Refresh token is not in database" });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const userId = decoded.id;
    if (!userId) {
      return res.status(404).json({ message: "No user found with this token" });
    }

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    existingToken.token = newRefreshToken;
    await existingToken.save();

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

module.exports = { signup, login, refreshToken };

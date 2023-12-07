const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: String,
  refreshToken: String,
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);

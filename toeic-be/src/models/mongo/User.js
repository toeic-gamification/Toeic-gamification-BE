const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const users = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    exp: {
      type: Number,
      default: 0,
    },
    coin: {
      type: Number,
      default: 0,
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", users);

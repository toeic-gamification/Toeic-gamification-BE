//Lịch sử game (MongoDB)
const mongoose = require("mongoose");

const gameLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  action: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GameLog", gameLogSchema);

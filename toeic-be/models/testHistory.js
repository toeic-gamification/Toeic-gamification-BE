const mongoose = require("mongoose");

const TestHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const TestHistory = mongoose.model("TestHistory", TestHistorySchema);
module.exports = TestHistory;

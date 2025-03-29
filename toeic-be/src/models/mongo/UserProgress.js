const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    gameData: {
      questsCompleted: {
        type: Number,
        default: 0,
      },
      vocabularyGarden: [
        {
          seedId: String,
          progress: {
            type: Number,
            default: 0,
          },
        },
      ],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserProgress", userProgressSchema);

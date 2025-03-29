const sequelize = require("./mysql/index");
const mongoose = require("./mongo/index");

// Import MySQL Models
const {
  User,
  Role,
  CoinTransaction,
  ExpHistory,
} = require("./mysql/associations");

// Import MongoDB Models
const UserProgress = require("./mongo/UserProgress");
const GameLog = require("./mongo/GameLog");
const Achievement = require("./mongo/Achievement");
const Inventory = require("./mongo/Inventory");

module.exports = {
  sequelize,
  mongoose,
  User,
  Role,
  CoinTransaction,
  ExpHistory,
  UserProgress,
  GameLog,
  Achievement,
  Inventory,
};

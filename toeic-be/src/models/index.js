const User = require("./User");
const Badge = require("./Badge");
const LeaderBoard = require("./LeaderBoard");
const Item = require("./Item");
const Game = require("./Game");
const Quest = require("./Quest");
const Shop = require("./Shop");
const Vocabulary = require("./Vocabulary");
const Customization = require("./Customization");

User.belongsToMany(Badge, { through: "UserBadges" });
Badge.belongsToMany(User, { through: "UserBadges" });

module.exports = {
  User,
  Badge,
  LeaderBoard,
  Item,
  Game,
  Quest,
  Shop,
  Vocabulary,
  Customization
};

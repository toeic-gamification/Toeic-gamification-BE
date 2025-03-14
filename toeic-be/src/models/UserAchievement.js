const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Achievement = require("./Achievement");

const UserAchievement = sequelize.define("UserAchievement", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  achievedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Thời gian đạt được thành tích
});

User.belongsToMany(Achievement, { through: UserAchievement });
Achievement.belongsToMany(User, { through: UserAchievement });

module.exports = UserAchievement;

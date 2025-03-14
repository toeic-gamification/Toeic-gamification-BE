const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Quest = sequelize.define("Quest", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  rewardXP: { type: DataTypes.INTEGER, allowNull: false },
  itemRewardId: { type: DataTypes.UUID, references: { model: "Items", key: "id" } },
  status: { type: DataTypes.ENUM("Pending", "Completed"), defaultValue: "Pending" },
});

module.exports = Quest;

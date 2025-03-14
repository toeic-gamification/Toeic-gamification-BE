const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const LeaderBoard = sequelize.define("LeaderBoard", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, references: { model: "Users", key: "id" } },
  rank: { type: DataTypes.INTEGER, allowNull: false },
  xp: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = LeaderBoard;

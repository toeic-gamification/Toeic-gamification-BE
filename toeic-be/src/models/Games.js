const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Game = sequelize.define("Game", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  difficulty: { type: DataTypes.ENUM("Easy", "Medium", "Hard"), allowNull: false },
});

module.exports = Game;

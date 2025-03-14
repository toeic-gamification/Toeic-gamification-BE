const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vocabulary = sequelize.define("Vocabulary", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  word: { type: DataTypes.STRING, allowNull: false },
  pronunciation: { type: DataTypes.STRING, allowNull: false }, // Phiên âm
});

module.exports = Vocabulary;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Achievement = sequelize.define("Achievement", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tên thành tích
  description: { type: DataTypes.TEXT, allowNull: false }, // Mô tả
  xp_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // XP thưởng
  icon: { type: DataTypes.STRING }, // Đường dẫn icon thành tích
});

module.exports = Achievement;

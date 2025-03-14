const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Challenge = sequelize.define("Challenge", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tên thử thách
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả thử thách
  difficulty: { type: DataTypes.ENUM("Easy", "Medium", "Hard"), allowNull: false, defaultValue: "Medium" }, // Mức độ thử thách
  xp_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 }, // XP thưởng khi hoàn thành
  coins_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 50 }, // Coins thưởng khi hoàn thành
  badge_reward: { type: DataTypes.UUID, allowNull: true, references: { model: "Badges", key: "id" } } // Huy hiệu nhận được khi hoàn thành
}, { timestamps: true });

module.exports = Challenge;

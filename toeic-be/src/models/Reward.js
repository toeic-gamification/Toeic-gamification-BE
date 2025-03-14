const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reward = sequelize.define("Reward", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tên phần thưởng
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả phần thưởng
  type: { 
    type: DataTypes.ENUM("xp", "coins", "item", "badge", "custom"), 
    allowNull: false 
  }, // Loại phần thưởng
  amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }, // Số lượng XP/Coins/Vật phẩm
  item_id: { type: DataTypes.UUID, allowNull: true }, // ID của vật phẩm/huy hiệu (nếu có)
  source: { 
    type: DataTypes.ENUM("quest", "challenge", "leaderboard", "event", "admin"), 
    allowNull: false 
  }, // Nguồn phần thưởng
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Thời gian cấp phần thưởng
});

module.exports = Reward;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Gift = sequelize.define("Gift", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  sender_id: { type: DataTypes.UUID, allowNull: false }, // Người gửi quà
  receiver_id: { type: DataTypes.UUID, allowNull: false }, // Người nhận quà
  type: { 
    type: DataTypes.ENUM("xp", "coins", "item", "badge", "custom"), 
    allowNull: false 
  }, // Loại quà tặng (XP, Coins, Vật phẩm, Huy hiệu, Custom)
  amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }, // Số lượng quà tặng
  item_id: { type: DataTypes.UUID, allowNull: true }, // ID vật phẩm/huy hiệu (nếu có)
  message: { type: DataTypes.STRING, allowNull: true }, // Lời nhắn của người gửi
  status: { 
    type: DataTypes.ENUM("pending", "accepted", "rejected"), 
    defaultValue: "pending" 
  }, // Trạng thái quà tặng
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Thời gian gửi quà
});

// Quan hệ với User
const User = require("./User");
Gift.belongsTo(User, { foreignKey: "sender_id", as: "sender", onDelete: "CASCADE" });
Gift.belongsTo(User, { foreignKey: "receiver_id", as: "receiver", onDelete: "CASCADE" });

module.exports = Gift;

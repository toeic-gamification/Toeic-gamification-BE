const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Friends = sequelize.define("Friends", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false }, // Người gửi yêu cầu kết bạn
  friend_id: { type: DataTypes.UUID, allowNull: false }, // Người nhận yêu cầu
  status: { 
    type: DataTypes.ENUM("pending", "accepted", "rejected", "blocked"), 
    defaultValue: "pending" 
  }, // Trạng thái yêu cầu kết bạn
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Thời gian gửi yêu cầu
});

// Quan hệ với User
const User = require("./User");
Friends.belongsTo(User, { foreignKey: "user_id", as: "requester", onDelete: "CASCADE" });
Friends.belongsTo(User, { foreignKey: "friend_id", as: "receiver", onDelete: "CASCADE" });

module.exports = Friends;

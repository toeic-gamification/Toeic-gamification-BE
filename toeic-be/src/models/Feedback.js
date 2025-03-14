const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Feedback = sequelize.define("Feedback", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false }, // Người gửi feedback
  target_type: { 
    type: DataTypes.ENUM("Lesson", "Course", "Challenge", "System"), 
    allowNull: false 
  }, // Loại nội dung được đánh giá
  target_id: { type: DataTypes.UUID, allowNull: false }, // ID của đối tượng được đánh giá
  rating: { type: DataTypes.INTEGER, allowNull: true, validate: { min: 1, max: 5 } }, // Đánh giá (1-5 sao)
  comment: { type: DataTypes.TEXT, allowNull: true }, // Nội dung phản hồi
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Thời gian gửi feedback
});

// Quan hệ với User
const User = require("./User");
Feedback.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = Feedback;

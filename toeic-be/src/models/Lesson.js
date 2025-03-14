const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lesson = sequelize.define("Lesson", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả bài học
  content: { type: DataTypes.TEXT, allowNull: false }, // Nội dung bài học
  level: { type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"), allowNull: false, defaultValue: "Beginner" },
  xp_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 50 }, 
  coins_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 20 }
}, { timestamps: true });

module.exports = Lesson;

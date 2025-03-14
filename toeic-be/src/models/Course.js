const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Course = sequelize.define("Course", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tiêu đề khóa học
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả khóa học
  level: { type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"), allowNull: false, defaultValue: "Beginner" }, // Mức độ khóa học
  xp_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 500 }, // XP thưởng khi hoàn thành khóa học
  coins_reward: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 200 } // Tiền thưởng khi hoàn thành khóa học
}, { timestamps: true });

module.exports = Course;

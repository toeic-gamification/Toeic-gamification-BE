const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT, // Cho phép câu hỏi dài hơn
    allowNull: false,
  },
  examId: {
    type: DataTypes.UUID,
    references: { model: "Exams", key: "id" },
    onDelete: "CASCADE", // Nếu xóa Exam, câu hỏi sẽ bị xóa theo
  },
});

module.exports = Question;

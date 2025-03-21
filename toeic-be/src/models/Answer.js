const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Question = require("./Question");

const Answer = sequelize.define("Answer", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  answerText: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Không cho phép chuỗi trống
    },
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  questionId: {
    type: DataTypes.UUID,
    allowNull: false, // Đảm bảo mỗi câu trả lời thuộc về một câu hỏi
    references: {
      model: Question,
      key: "id",
    },
    onDelete: "CASCADE", // Xóa Answer nếu Question bị xóa
  },
});

// Định nghĩa quan hệ
Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

module.exports = Answer;

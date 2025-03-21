const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Exam = sequelize.define("Exam", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: false,
  },
});

module.exports = Exam;

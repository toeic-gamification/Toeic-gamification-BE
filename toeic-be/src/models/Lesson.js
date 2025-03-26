const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lesson = sequelize.define("Lesson", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
});

module.exports = Lesson;

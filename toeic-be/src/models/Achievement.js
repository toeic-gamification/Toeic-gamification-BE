const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Achievement = sequelize.define("Achievement", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Tránh trùng tên thành tích
    validate: {
      len: [3, 100], // Tên thành tích từ 3 đến 100 ký tự
    },
  },
  description: {
    type: DataTypes.TEXT, // Cho phép mô tả dài hơn
    allowNull: true,
  },
  xpReward: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0, // Không cho phép giá trị âm
    },
  },
  coinReward: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0, // Không cho phép giá trị âm
    },
  },
});

module.exports = Achievement;

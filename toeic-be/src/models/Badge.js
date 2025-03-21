const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Badge = sequelize.define("Badge", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Đảm bảo không có huy hiệu trùng tên
    validate: {
      notEmpty: true, // Không cho phép tên trống
    },
  },
  description: {
    type: DataTypes.STRING(255), // Giới hạn tối đa 255 ký tự
    validate: {
      len: [0, 255], // Đảm bảo độ dài không vượt quá giới hạn
    },
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true, // Đảm bảo đây là một URL hợp lệ
    },
  },
});

module.exports = Badge;

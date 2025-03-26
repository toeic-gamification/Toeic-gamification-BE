const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql"); // Đảm bảo đường dẫn chính xác đến file config

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles", // Tên bảng trong database
    timestamps: false, // Nếu không cần `createdAt` và `updatedAt`
  }
);

module.exports = Role;

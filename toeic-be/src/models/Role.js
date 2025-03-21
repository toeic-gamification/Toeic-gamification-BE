const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize;

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Đảm bảo mỗi Role là duy nhất
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No description", // Giá trị mặc định
    },
  },
  { timestamps: true }
); // Tự động thêm `createdAt` và `updatedAt`

module.exports = Role;

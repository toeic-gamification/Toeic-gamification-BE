const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysql");

const Role = sequelize.define(
  "Role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "Roles",
  }
);

module.exports = Role;

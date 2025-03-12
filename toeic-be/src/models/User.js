const{ DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
}, { timestamps: true });

module.exports = User;
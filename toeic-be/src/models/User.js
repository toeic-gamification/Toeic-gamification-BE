const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
  coins: { type: DataTypes.INTEGER, defaultValue: 0 },
  avatar: { type: DataTypes.STRING, defaultValue: "default_avatar.png" },
  clanId: { type: DataTypes.UUID, references: { model: "Clans", key: "id" } }, // Thêm clanId
});

module.exports = User;
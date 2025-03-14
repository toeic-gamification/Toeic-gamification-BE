const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const XPSystem = sequelize.define("XPSystem", {
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: "Users", key: "id" } },
  xpGained: { type: DataTypes.INTEGER, allowNull: false },
  activity: { type: DataTypes.STRING, allowNull: false }, 
});

module.exports = XPSystem;

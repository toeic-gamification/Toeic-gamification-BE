const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Clan = sequelize.define("Clan", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
});

module.exports = Clan;

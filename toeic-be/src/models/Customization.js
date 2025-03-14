const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customization = sequelize.define("Customization", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  type: { type: DataTypes.ENUM("Avatar", "Background", "Effect"), allowNull: false },
  price: { type: DataTypes.INTEGER, defaultValue: 0 },
  icon: { type: DataTypes.STRING, defaultValue: "default_custom.png" }
}, { timestamps: true });

module.exports = Customization;

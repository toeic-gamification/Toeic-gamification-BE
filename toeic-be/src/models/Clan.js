const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Clan = sequelize.define("Clan", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tên Clan
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả Clan
  xp_total: { type: DataTypes.INTEGER, defaultValue: 0 }, // Tổng XP của Clan
  coins_total: { type: DataTypes.INTEGER, defaultValue: 0 }, // Tổng Coins Clan đã kiếm được
  emblem: { type: DataTypes.STRING, allowNull: true } // Hình đại diện/biểu tượng của Clan
}, { timestamps: true });

module.exports = Clan;

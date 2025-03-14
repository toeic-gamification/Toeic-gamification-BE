const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Currency = sequelize.define("Currency", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }, // Tên loại tiền tệ
  symbol: { type: DataTypes.STRING, allowNull: false }, // Ký hiệu (vd: 💰, 🎟️)
  description: { type: DataTypes.TEXT, allowNull: true }, // Mô tả tiền tệ
  exchange_rate: { type: DataTypes.FLOAT, defaultValue: 1 }, // Tỷ giá đổi sang đơn vị tiêu chuẩn (nếu có)
});

module.exports = Currency;

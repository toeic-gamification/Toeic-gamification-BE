const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MiniTest = sequelize.define("MiniTest", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 7,
    },
  },
  requiredToeicScore: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = MiniTest;

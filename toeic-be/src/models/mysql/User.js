const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");
const Role = require("./Role");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    coin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

User.belongsTo(Role, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Role.hasMany(User, {
  foreignKey: "roleId",
});

module.exports = User;

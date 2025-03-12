const sequelize = require("../config/db");
const User = require("./User");

const db = { sequelize, User };

db.sequelize.sync({ alter: true }) // Tự động cập nhật DB nếu có thay đổi
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Database sync error:", err));

module.exports = db;

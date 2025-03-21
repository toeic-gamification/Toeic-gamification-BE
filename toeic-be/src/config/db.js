const { Sequelize } = require("sequelize");
require("dotenv").config();
const mysql = require("mysql2/promise");

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
  );
  await connection.end();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

async function initializeSequelize() {
  await createDatabaseIfNotExists();
  await sequelize.authenticate();
  console.log("✅ Kết nối MySQL thành công!");
}

initializeSequelize();

module.exports = sequelize;

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./src/routes");
app.use("/api/users", userRoutes);

module.exports = app;

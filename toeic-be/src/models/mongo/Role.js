const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const Roles = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Role = mongoose.model("Role", Roles);

module.exports = Role;

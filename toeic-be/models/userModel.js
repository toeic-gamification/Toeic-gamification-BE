const db = require("../config/db");

const User = {
  getAllUsers: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  createUser: (name, email, callback) => {
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], callback);
  },
};

module.exports = User;

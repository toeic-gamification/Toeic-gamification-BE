const User = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  User.createUser(name, email, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User created", id: result.insertId });
  });
};

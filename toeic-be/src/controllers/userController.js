const { User } = require("../models/mysql");

const registerUser = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = await User.create({ name, email, username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

module.exports = { registerUser, getUserProfile };

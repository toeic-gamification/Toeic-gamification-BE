const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { comparePassword, generateToken } = require("../utils/auth");

const router = express.Router();

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    // Tạo JWT với role
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({ message: "Đăng nhập thành công", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;

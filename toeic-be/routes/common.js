const express = require("express");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

// Cả Admin & Teacher đều truy cập được
router.get("/dashboard", authMiddleware(["Admin", "Teacher"]), (req, res) => {
  res.json({ message: "Chào mừng Admin & Giáo Viên!", user: req.user });
});

module.exports = router;

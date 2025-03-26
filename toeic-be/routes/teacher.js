const express = require("express");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

// Chỉ Teacher được truy cập
router.get("/dashboard", authMiddleware(["Teacher"]), (req, res) => {
  res.json({ message: "Chào mừng Giáo Viên!", user: req.user });
});

module.exports = router;

const express = require("express");
const authMiddleware = require("../authMiddlewareeware");

const router = express.Router();

// Chỉ Admin được truy cập
router.get("/dashboard", authMiddleware(["Admin"]), (req, res) => {
  res.json({ message: "Chào mừng Admin!", user: req.user });
});

module.exports = router;

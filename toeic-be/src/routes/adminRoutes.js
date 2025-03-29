const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");
const {
  authMiddleware,
  verifyAdmin,
} = require("../middlewares/authMiddleware"); // Đúng cách

router.get("/users", authMiddleware, verifyAdmin, getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;

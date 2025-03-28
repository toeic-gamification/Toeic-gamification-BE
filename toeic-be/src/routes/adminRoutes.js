const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/adminController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/users", verifyAdmin, getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/users", userController.getAllUsers);
router.post("/register", userController.createUser)
module.exports = router;

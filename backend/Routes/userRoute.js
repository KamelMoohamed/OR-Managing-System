const express = require("express");
const userController = require("./../Controllers/userController");

const router = express.Router();
router.route("/").post(userController.createUser);

module.exports = router;

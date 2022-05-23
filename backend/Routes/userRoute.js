const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.route("/").post(userController.createUser);
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;

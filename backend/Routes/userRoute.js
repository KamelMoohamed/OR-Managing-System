const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router
  .route("/createuser")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    userController.createUser
  );
router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .patch(authController.protect, userController.updateMe);

module.exports = router;

const express = require("express");
const operationController = require("./../Controllers/operationController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    operationController.createOperation
  );
router
  .route("/:id")
  .get(authController.protect, operationController.getOperation)
  .delete(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor", "admin"),
    operationController.deleteOperation
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor", "admin"),
    operationController.updateOperation
  );

module.exports = router;

const express = require("express");
const operationController = require("./../Controllers/operationController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/create_operation")
  .post(
    authController.protect,
    authController.restrictTo("officer"),
    operationController.createOperation
  );
router
  .route("/:id")
  .get(authController.protect, operationController.getOperation)
  .delete(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor"),
    operationController.deleteOperation
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor"),
    operationController.updateOperation
  );

module.exports = router;

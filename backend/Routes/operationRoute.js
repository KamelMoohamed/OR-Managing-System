const express = require("express");
const operationController = require("./../Controllers/operationController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("officer", "admin", "ORadmin"),
    operationController.getAllOperations
  )
  .post(
    authController.protect,
    authController.restrictTo("officer", "admin", "ORadmin"),
    operationController.createOperation
  );
router
  .route("/:id")
  .get(authController.protect, operationController.getOperation)
  .delete(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor", "admin", "ORadmin"),
    operationController.deleteOperation
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "lead-doctor", "admin", "ORadmin"),
    operationController.updateOperation
  );

router
  .route("/:id/:reply")
  .patch(
    authController.protect,
    authController.restrictTo("lead-doctor", "patient"),
    operationController.replyOperation
  );
router
  .route("/:id/finish")
  .patch(
    authController.protect,
    authController.restrictTo("lead-nurse"),
    operationController.finishOperation
  );

module.exports = router;

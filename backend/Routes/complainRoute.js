const express = require("express");
const complainController = require("./../Controllers/complainController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(complainController.createComplain)
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin", "officer"),
    complainController.setRole,
    complainController.getAllComplain
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin", "officer"),
    complainController.getComplain
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "ORadmin", "officer"),
    complainController.replayComplain
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    complainController.deleteComplain
  );

router
  .route("/:id/forward")
  .patch(
    authController.protect,
    authController.restrictTo("admin", "officer"),
    complainController.adminForward
  );

module.exports = router;

const express = require("express");
const complainController = require("./../Controllers/complainController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(complainController.createComplain)
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    complainController.setRole,
    complainController.getAllComplain
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    complainController.getComplain
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
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
    authController.restrictTo("admin"),
    complainController.adminForward
  );

module.exports = router;

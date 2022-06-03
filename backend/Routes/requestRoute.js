const express = require("express");
const authController = require("./../Controllers/authController");
const requestController = require("./../Controllers/requestController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    requestController.getAllRequests
  )
  .post(
    authController.protect,
    authController.restrictTo("lead-doctor"),
    requestController.createRequest
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    requestController.getRequest
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    requestController.updateRequest
  );
module.exports = router;

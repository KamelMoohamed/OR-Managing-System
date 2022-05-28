const express = require("express");
const authController = require("./../Controllers/authController");
const requestController = require("./../Controllers/requestController");

const router = express.Router();

router
  .route("/")
  .get(requestController.getAllRequests)
  .post(
    authController.protect,
    authController.restrictTo("lead-doctor"),
    requestController.createRequest
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    requestController.getRequest
  )
  .patch(
    authController.protect,
    authController.restrictTo("ORadmin"),
    requestController.updateRequest
  );
module.exports = router;

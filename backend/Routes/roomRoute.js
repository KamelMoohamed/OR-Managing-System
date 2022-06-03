const express = require("express");
const roomController = require("./../Controllers/roomController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.createRoom
  )
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    roomController.getAllRooms
  );
router
  .route("/available-room")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    roomController.getAvailableRooms
  );
router
  .route("/:id")
  .get(authController.protect, roomController.getRoom)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.deleteRoom
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.updateRoom
  );
router
  .route("/:id/sterilize")
  .patch(
    authController.protect,
    authController.restrictTo("ORadmin"),
    roomController.sterilization
  );
module.exports = router;

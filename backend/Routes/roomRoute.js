const express = require("express");
const roomController = require("./../Controllers/roomController");

const router = express.Router();

router
  .route("/")
  .post(roomController.createRoom)
  .get(roomController.getAvailableRooms);
router
  .route("/:id")
  .get(roomController.getRoom)
  .delete(roomController.deleteRoom)
  .patch(roomController.updateRoom);

module.exports = router;
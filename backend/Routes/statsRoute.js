const express = require("express");
const authController = require("./../Controllers/authController");
const statsController = require("./../Controllers/statsController");

const router = express.Router();

router
  .route("/doctor-number")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.staffNumber
  );

router
  .route("/working-hours")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.staffWorkingHours
  );
router
  .route("/operation-each")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.operationEach
  );
router
  .route("/rooms")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.rooms
  );
router
  .route("/busyrooms")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.busyRooms
  );
router
  .route("/roomshours")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.RoomsHours
  );

router
  .route("/used-supplies")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    statsController.mostSupplies
  );
router
  .route("/many-operation")
  .get(authController.protect, statsController.nStaffOperation);

router
  .route("/user-operations")
  .get(authController.protect, statsController.userEach);
module.exports = router;

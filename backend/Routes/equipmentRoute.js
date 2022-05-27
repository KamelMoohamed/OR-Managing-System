const express = require("express");
const equipmentController = require("./../Controllers/equipmentController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    equipmentController.createEquipment
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    equipmentController.getEquipment
  )
  .delete(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    equipmentController.deleteEquipment
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    equipmentController.updateEquipment
  );

router
  .route("/add_checkup")
  .post(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.addCheckup
  );

router
  .route("/check_calibration")
  .get(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.checkCalibration
  );

router
  .route("/need_calibration")
  .patch(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.checkCalibration
  );

module.exports = router;

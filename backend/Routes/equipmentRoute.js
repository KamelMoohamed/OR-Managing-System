const express = require("express");
const equipmentController = require("./../Controllers/equipmentController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/create_equipment")
  .post(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.createEquipment
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.getEquipment
  )
  .delete(
    authController.protect,
    authController.restrictTo("officer"),
    equipmentController.deleteEquipment
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer"),
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

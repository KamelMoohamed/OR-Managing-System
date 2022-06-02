const express = require("express");
const equipmentController = require("./../Controllers/equipmentController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.createEquipment
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.getEquipment
  )
  .delete(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.deleteEquipment
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.updateEquipment
  );

router
  .route("/add_checkup/:id")
  .post(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.addCheckup
  );

router
  .route("/need_calibration/:id")
  .patch(
    authController.protect,
    authController.restrictTo("officer", "ORadmin"),
    equipmentController.needCalibtation
  );

module.exports = router;

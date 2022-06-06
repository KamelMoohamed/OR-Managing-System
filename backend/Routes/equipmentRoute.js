const express = require("express");
const equipmentController = require("./../Controllers/equipmentController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    equipmentController.createEquipment
  )
  .get(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    equipmentController.getAllEquipment
  );

router
  .route("/available-equipment")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin"),
    equipmentController.getAvailableEquip
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    equipmentController.getEquipment
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    equipmentController.deleteEquipment
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    equipmentController.updateEquipment
  );

router
  .route("/add_checkup/:id")
  .post(
    authController.protect,
    authController.restrictTo("ORadmin"),
    equipmentController.addCheckup
  );

router
  .route("/need_calibration/:id")
  .patch(
    authController.protect,
    authController.restrictTo("ORadmin"),
    equipmentController.needCalibtation
  );

module.exports = router;

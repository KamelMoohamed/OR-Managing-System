const express = require("express");
const authController = require("./../Controllers/authController");
const supplyController = require("./../Controllers/supplyController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    supplyController.createSupply
  )
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    supplyController.getAllSupply
  );

router
  .route("/add")
  .patch(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    supplyController.addSupplies
  );
router
  .route("/needed")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    supplyController.getInNeed
  );

router
  .route("/check")
  .get(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    supplyController.checkSupplies
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin", "ORadmin"),
    supplyController.getSupply
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    supplyController.deleteSupply
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    supplyController.updateSupply
  );

module.exports = router;

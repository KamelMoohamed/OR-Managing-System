const express = require("express");
const authController = require("./../Controllers/authController");
const supplyController = require("./../Controllers/supplyController");
const orAdminController = require("./../Controllers/orAdminController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("officer", "admin", "ORadmin"),
    supplyController.createSupply
  );

router
  .route("/add")
  .patch(
    authController.protect,
    authController.restrictTo("ORadmin", "admin"),
    orAdminController.addSupplies
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("officer", "admin", "ORadmin"),
    supplyController.getSupply
  )
  .delete(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    supplyController.deleteSupply
  )
  .patch(
    authController.protect,
    authController.restrictTo("officer", "admin"),
    supplyController.updateSupply
  );

module.exports = router;

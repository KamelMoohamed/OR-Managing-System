const express = require("express");
const patientController = require("./../Controllers/patientController");
const authController = require("../Controllers/authController");

const router = express.Router();

router.route("/").post(patientController.createPatient);
router
  .route("/:id")
  .get(authController.protect, patientController.getPatient)
  .delete(patientController.deletePatient)
  .patch(patientController.updatePatient);
module.exports = router;

const express = require("express");
const patientController = require("./../Controllers/patientController");

const router = express.Router();

router.route("/").post(patientController.createPatient);
router.route("/:id").get(patientController.getPatient);

module.exports = router;

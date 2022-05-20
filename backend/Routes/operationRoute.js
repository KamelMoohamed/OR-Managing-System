const express = require("express");
const operationController = require("./../Controllers/operationController");

const router = express.Router();

router.route("/").post(operationController.createOperation);

module.exports = router;

const express = require("express");
const operationController = require("./../Controllers/operationController");

const router = express.Router();

router.route("/").post(operationController.createOperation);
router.route("/:id").get(operationController.getOperation);

module.exports = router;

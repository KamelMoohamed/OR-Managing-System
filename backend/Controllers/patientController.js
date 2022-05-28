const handlerFactory = require("./handlerFactory");
const Patient = require("./../models/patientModel");

exports.createPatient = handlerFactory.CreateOne(Patient);
exports.getPatient = handlerFactory.getOne(Patient);
exports.deletePatient = handlerFactory.deleteOne(Patient);
exports.updatePatient = handlerFactory.updateOne(Patient);

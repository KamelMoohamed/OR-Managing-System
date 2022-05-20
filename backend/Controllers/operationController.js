const handlerFactory = require("./handlerFactory");
const Operation = require("./../models/operationModel");

exports.createOperation = handlerFactory.CreateOne(Operation);
exports.getOperation = handlerFactory.getOne(Operation);
exports.updateOperation = handlerFactory.updateOne(Operation);
exports.deleteOperation = handlerFactory.deleteOne(Operation);

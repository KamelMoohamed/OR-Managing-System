const Supply = require("./../models/supplyModel");
const handlerFactory = require("./handlerFactory");

exports.getSupply = handlerFactory.getOne(Supply);
exports.createSupply = handlerFactory.CreateOne(Supply);
exports.updateSupply = handlerFactory.updateOne(Supply);
exports.deleteSupply = handlerFactory.deleteOne(Supply);

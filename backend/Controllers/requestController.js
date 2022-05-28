const handlerFactory = require("./handlerFactory");
const catchAsync = require("./../utils/CatchAsync");
const Request = require("./../models/requestModel");

exports.createRequest = handlerFactory.CreateOne(Request);
exports.getRequest = handlerFactory.getOne(Request);
exports.getAllRequests = handlerFactory.getAll(Request);
exports.updateRequest = handlerFactory.updateOne(Request);

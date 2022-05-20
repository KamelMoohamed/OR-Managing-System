const handlerFactory = require("./handlerFactory");
const User = require("./../models/userModel");

exports.createUser = handlerFactory.CreateOne(User);
exports.getUser = handlerFactory.getOne(User);

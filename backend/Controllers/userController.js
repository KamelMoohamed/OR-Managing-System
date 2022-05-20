const handlerFactory = require("./handlerFactory");
const User = require("./../models/userModel");

exports.createUser = handlerFactory.CreateOne(User);

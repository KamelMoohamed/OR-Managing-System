const handlerFactory = require("./handlerFactory");
const Room = require("./../models/roomModel");

exports.createRoom = handlerFactory.CreateOne(Room);
exports.getRoom = handlerFactory.getOne(Room, { path: "operations" });

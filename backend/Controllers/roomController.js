const handlerFactory = require("./handlerFactory");
const Room = require("./../models/roomModel");

exports.createRoom = handlerFactory.CreateOne(Room);
exports.getRoom = handlerFactory.getOne(Room, { path: "operations" });
exports.deleteRoom = handlerFactory.deleteOne(Room);
exports.updateRoom = handlerFactory.updateOne(Room);

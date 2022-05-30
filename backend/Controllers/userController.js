const handlerFactory = require("./handlerFactory");
const User = require("./../models/userModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");
const Operation = require("./../models/operationModel");
const Request = require("./../models/requestModel");
const mongoose = require("mongoose");

exports.updateMe = CatchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No User with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getMyPatients = CatchAsync(async (req, res, next) => {
  //
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No User with that id", 404));
  }

  const ops = user.schedule;
  const patients = [];
  for (i = 0; i < ops.length; i++) {
    const op = await Operation.findById(ops[i].operation, "patient").exec();
    patients.push(op.patient);
  }

  nonDuplicatePatients = patients.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
  res.status(200).json({
    status: "success",
    patients: nonDuplicatePatients,
  });
});

exports.getUpcomingOperations = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No User with that id", 404));
  }

  const ops = user.schedule;
  var today = new Date();
  for (var i = ops.length - 1; i >= 0; i--) {
    if (ops[i].end.getTime() > today.getTime()) {
      ops.splice(i, 1);
    }
  }

  res.status(200).json({
    status: "success",
    operations: {
      ops,
    },
  });
});

exports.getPerviousOperations = CatchAsync(async (req, res, next) => {
  const ops = await Operation.find({
    rooms: { $elemMatch: { end: { $gte: Date.now() } } },
  });

  let preOps = [];

  for (var i = ops.length - 1; i >= 0; i--) {
    users = ops[i].staff;
    for (var j = users.length - 1; j >= 0; j--)
      if (users[j].id === req.user.id) {
        preOps.push(ops[i]);
      }
  }

  res.status(200).json({
    status: "success",
    operations: {
      preOps,
    },
  });
});

exports.getPendingRequests = CatchAsync(async (req, res, next) => {
  const requests = await Request.find({
    status: "Pending",
    doctor: req.user,
  });
  res.status(200).json({
    status: "success",
    requests: {
      requests,
    },
  });
});

exports.createUser = handlerFactory.CreateOne(User);
exports.getUser = handlerFactory.getOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);

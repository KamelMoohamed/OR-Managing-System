const handlerFactory = require("./handlerFactory");
const User = require("./../models/userModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");
const Operation = require("./../models/operationModel");
const Request = require("./../models/requestModel");
const mongoose = require("mongoose");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = CatchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email", "phone");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
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
  console.log(req.user.role);
  var requests;
  if (req.user.role === "lead-doctor") {
    requests = await Request.find({
      status: { $in: ["OR Pending", "Nurse Pending"] },
      doctor: req.user,
    });
  } else if (req.user.role === "lead-nurse" || req.user.role === "nurse") {
    requests = await Request.find({
      status: { $in: ["Nurse Pending"] },
      nurse: req.user,
    });
  } else if (req.user.role === "ORadmin") {
    requests = await Request.find({
      status: { $in: ["OR Pending"] },
    });
  }
  res.status(200).json({
    status: "success",
    requests: {
      requests,
    },
  });
});
exports.availableDoctor = CatchAsync(async (req, res, next) => {
  const doctors = await User.find({
    role: { $in: ["lead-doctor", "doctor", "doctor-Assistant"] },
    emergencyday: new Date().getDay(),
    type: req.query.type,
  });
  const nurses = await User.find({
    role: { $in: ["lead-nurse", "nurse"] },
    emergencyday: new Date().getDay(),
  });
  res.status(200).json({
    status: "success",

    AvailableDoctors: doctors,
    Availablenurses: nurses,
  });
});
exports.userInBody = (req, res, next) => {
  req.body.role = req.user.role;
  next();
};

exports.createUser = handlerFactory.CreateOne(User);
exports.getUser = handlerFactory.getOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);

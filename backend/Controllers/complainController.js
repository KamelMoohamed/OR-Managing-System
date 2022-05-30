const AppError = require("../utils/appError");
const Complain = require("./../models/complainModel");
const CatchAsync = require("./../utils/CatchAsync");
const handlerFactory = require("./handlerFactory");
const email = require("./../utils/email");

exports.createComplain = CatchAsync(async (req, res, next) => {
  const allowedBody = {
    Name: req.body.Name,
    email: req.body.email,
    complainText: req.body.complainText,
  };

  if (req.body.phone) allowedBody.phone = req.body.phone;

  const complain = await Complain.create(allowedBody);
  res.status(200).json({
    status: "success",
    date: complain,
  });
});
exports.replayComplain = CatchAsync(async (req, res, next) => {
  const complain = await Complain.findById(req.params.id);
  if (!req.body.replay) return next(new AppError("Please Write a replay", 400));
  complain.replay = req.body.replay;
  complain.lastUpdate = Date.now();
  complain.status = "closed";
  await complain.save();
  email.sendMail({
    email: complain.email,
    subject: "OR system Compliant",
    message: complain.replay,
  });
  res.status(200).json({
    status: "success",
    date: complain,
  });
});
exports.adminForward = CatchAsync(async (req, res, next) => {
  const complain = await Complain.findById(req.params.id);
  complain.status = "To admin";
  complain.lastUpdate = Date.now();
  await complain.save();
  res.status(200).json({
    status: "success",
    date: complain,
  });
});

exports.setRole = (req, res, next) => {
  if (!req.body.role) req.body.role = req.user.role;
  next();
};
exports.getComplain = handlerFactory.getOne(Complain);
exports.getAllComplain = handlerFactory.getAll(Complain);
exports.deleteComplain = handlerFactory.deleteOne(Complain);

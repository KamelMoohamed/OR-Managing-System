const handlerFactory = require("./handlerFactory");
const Operation = require("./../models/operationModel");
const CatchAsync = require("./../utils/CatchAsync");
const suppliesHandler = require("./../utils/SuppliesHandler");
const AppError = require("../utils/appError");

const updateOperation = CatchAsync(async (req, res, next) => {
  const found = await Operation.findById(req.params.id);
  if (req.body.rooms || req.body.staff) {
    if (req.body.rooms) found.rooms = req.body.rooms;
    if (req.body.staff) found.staff = req.body.staff;
    await found.save();
  }

  const doc = await Operation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new appError("No operation with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.finishOperation = CatchAsync(async (req, res, next) => {
  const docs = await Operation.findById(req.params.id);
  if (!docs)
    return next(new AppError("there is no operation with that Id", 404));
  if (docs.end > Date.now())
    return next(new AppError("this operation hasn't ended yet", 400));
  if (req.body.supplies) {
    let allSup = suppliesHandler.supplySum(req.body.supplies, docs.supplies);
    const flag = await suppliesHandler.useSupply(allSup);
    if (!flag) return next(new AppError("Something Wrong Happend", 500));
    docs.supplies = allSup;
  }
  docs.status = "Done";
  docs.save();
  res.status(200).json({
    status: "success",
    docs,
  });
});
exports.createOperation = handlerFactory.CreateOne(Operation);
exports.getOperation = handlerFactory.getOne(Operation);
exports.updateOperation = updateOperation;
exports.deleteOperation = handlerFactory.deleteOne(Operation);
exports.getAllOperations = handlerFactory.getAll(Operation);

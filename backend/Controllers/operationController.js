const handlerFactory = require("./handlerFactory");
const Operation = require("./../models/operationModel");
const CatchAsync = require("./../utils/CatchAsync");

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
exports.createOperation = handlerFactory.CreateOne(Operation);
exports.getOperation = handlerFactory.getOne(Operation);
exports.updateOperation = updateOperation;
exports.deleteOperation = handlerFactory.deleteOne(Operation);
exports.getAllOperations = handlerFactory.getAll(Operation);

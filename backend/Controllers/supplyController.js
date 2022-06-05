const Supply = require("./../models/supplyModel");
const handlerFactory = require("./handlerFactory");
const CatchAsync = require("./../utils/CatchAsync");
const Operation = require("./../models/operationModel");
const suppliesHandler = require("./../utils/SuppliesHandler");
const AppError = require("../utils/appError");
const notification = require("./../utils/notification");

exports.checkSupplies = async () => {
  let Today = new Date();
  Today.setHours(0, 0, 0, 0);
  let Tomorrow = new Date();
  Tomorrow.setHours(23, 59, 59, 0);
  const operations = await Operation.find({
    rooms: {
      $elemMatch: {
        start: { $gte: Today, $lte: Tomorrow },
      },
    },
  });
  let totalSupplies = [];
  for (i of operations) {
    const supplies = i.supplies;
    totalSupplies = suppliesHandler.supplySum(totalSupplies, supplies);
  }
  const use = await suppliesHandler.checkSupply(totalSupplies);
  if (!use) console.log("Something Wrong Happened");
};
exports.addSupplies = CatchAsync(async (req, res, next) => {
  const supplies = req.body;
  const flag = await suppliesHandler.addSupply(supplies);
  if (!flag) return next(new AppError("there is no supply with that id", 400));
  res.status(200).json({
    status: "success",
    message: "Supplies Added successfully",
  });
});
exports.getInNeed = CatchAsync(async (req, res, next) => {
  const docs = await Supply.find({ inNeed: true });
  res.status(200).json({
    status: "success",
    results: docs.length,
    docs,
  });
});
exports.getSupply = handlerFactory.getOne(Supply);
exports.getAllSupply = handlerFactory.getAll(Supply);
exports.createSupply = handlerFactory.CreateOne(Supply);
exports.updateSupply = handlerFactory.updateOne(Supply);
exports.deleteSupply = handlerFactory.deleteOne(Supply);

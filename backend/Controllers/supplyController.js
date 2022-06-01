const Supply = require("./../models/supplyModel");
const handlerFactory = require("./handlerFactory");
const CatchAsync = require("./../utils/CatchAsync");
const Operation = require("./../models/operationModel");
const suppliesHandler = require("./../utils/SuppliesHandler");
const AppError = require("../utils/appError");

exports.checkSupplies = async () => {
  let Today = Date.now().setHours(0, 0, 0, 0);
  let Tomorrow = Date.now().setHours(23, 59, 59, 0);
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

const { Model } = require("mongoose");
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/CatchAsync");
const SuppliesHandler = require("../utils/SuppliesHandler");

exports.addSupplies = CatchAsync(async (req, res, next) => {
  const supplies = req.body;
  const flag = await SuppliesHandler.addSupply(supplies);
  if (!flag) return next(new AppError("there is no supply with that id", 400));
  res.status(200).json({
    status: "success",
    message: "Supplies Added successfully",
  });
});

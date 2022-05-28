const { Model } = require("mongoose");
const AppError = require("../utils/appError");
const CatchAsync = require("../utils/CatchAsync");
const Supply = require("./../models/supplyModel");

exports.addSupplies = CatchAsync(async (req, res, next) => {
  const supplies = req.body;
  const flag = await AddSupply(Supply, supplies, next);
  if (!flag) return next(new AppError("there is no supply with that id", 400));
  res.status(200).json({
    status: "success",
    message: "Supplies Added successfully",
  });
});

const AddSupply = async (Model, added, next) => {
  let documents = [];
  for (let i = 0; i < added.length; i++) {
    const docs = await Model.findById(added[i].supply);
    if (!docs) return false;
    documents.push(docs);
  }
  for (let i = 0; i < documents.length; i++) {
    documents[i].quantity += added[i].quantity;
    await documents[i].save();
  }
  return true;
};

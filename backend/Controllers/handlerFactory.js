const CatchAsync = require("../utils/CatchAsync");

exports.CreateOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        doc: newDoc,
      },
    });
  });

exports.updateOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new Error("No document with that id"));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

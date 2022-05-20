const CatchAsync = require("../utils/CatchAsync");
const appError = require("./../utils/appError");

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
      return next(new appError("No document with that id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  });

const getOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const docID = req.params.id;

    let doc;
    doc = await Model.findById(docID);

    if (!doc) {
      const error = new appError("Could not find a document for that ID.", 404);
      return next(error);
    }

    res.status(200).json({ doc: doc.toObject({ getters: true }) });
  });

const deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const docID = req.params.id;

    let doc;
    doc = await Model.findByIdAndDelete(docID);

    if (!doc) {
      return next(new appError("No Document found with that ID", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });

exports.deleteOne = deleteOne;
exports.getOne = getOne;

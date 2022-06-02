const CatchAsync = require("../utils/CatchAsync");
const appError = require("./../utils/appError");
const APIFeatures = require("./../utils/ApiFeatures");
const Request = require("./../models/requestModel");
exports.CreateOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    if (Model === Request) {
      newDoc.doctor = req.user;
      await newDoc.save();
    }
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

exports.getOne = (Model) =>
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

exports.deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const docID = req.params.id;

    let doc;
    doc = await Model.findByIdAndDelete(docID);

    if (!doc) {
      return next(new appError("No Document found with that ID", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });

exports.getAll = (Model) =>
  CatchAsync(async (req, res, next) => {
    let filter = {};
    if (req.body) {
      if (req.body.role === "officer") filter = { status: "open" };
      else if (req.body.role === "ORadmin") filter = { status: "To admin" };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

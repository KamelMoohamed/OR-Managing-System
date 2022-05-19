const CatchAsync = require("../utils/CatchAsync");
const HttpError = require("../utils/http-error");

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

const deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const docID = req.params.id;

    let doc;
    try {
      doc = await Model.findByIdAndDelete(docID);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not delete the Document.",
        500
      );
      return next(error);
    }
    if (!doc) {
      return next(new HttpError("No Document found with that ID", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });

exports.deleteOne = deleteOne;

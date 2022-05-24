const handlerFactory = require("./handlerFactory");
const User = require("./../models/userModel");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/appError");

const updateMe = CatchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No User with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = handlerFactory.CreateOne(User);
exports.getUser = handlerFactory.getOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.updateMe = updateMe;

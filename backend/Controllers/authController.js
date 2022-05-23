const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const appError = require("../utils/appError");
const CatchAsync = require("../utils/CatchAsync");

const userToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return new appError("Please provide both email and password", 400);
  }

  const user = await User.findOne({ email: email }).select("+password");
  const correct = await User.correctPassword(password, user.password);

  if (!user || !correct) {
    return new appError("Incorrect email or password", 401);
  }

  const token = userToken(user._id);
  res.status(200).json({
    status: "success",
    token: token,
  });
});

const protect = CatchAsync(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return new AppError("You aren't logged in!", 401);
  }

  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentlyUser = User.findById(decodedData.id);
  if (!currentlyUser) {
    return new AppError("The token dosen't longer exist.", 401);
  }
  if (!currentlyUser.changePasswordAfter(decodedData.id)) {
    return new AppError(
      "User recently changed password! please log in again.",
      401
    );
  }
  req.user = currentlyUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You aren't have a permission to perform this action.",
          403
        )
      );
    }
    next();
  };
};

exports.login = login;
exports.protect = protect;
exports.restrictTo = restrictTo;

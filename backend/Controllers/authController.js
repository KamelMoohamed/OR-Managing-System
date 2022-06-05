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

const createSendToken = (user, statusCode, res) => {
  const token = userToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = CatchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError("Please provide both email and password", 400));
  }

  const user = await User.findOne({ email: email }).select("+password");
  if (!user) return next(new appError("incorrect email or password", 400));
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new appError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You aren't logged in!", 401));
  }

  const decodedData = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const currentlyUser = await User.findById(decodedData.id);
  if (!currentlyUser) {
    return next(new AppError("The token dosen't longer exist.", 401));
  }
  if (currentlyUser.changePasswordAfter(decodedData.iat)) {
    return next(
      new AppError("User recently changed password! please log in again.", 401)
    );
  }
  req.user = currentlyUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You have no permission to preform this action", 403)
      );
    }
    next();
  };
};

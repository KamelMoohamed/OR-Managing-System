const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    SSN: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: [true, "the User must have first name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "please provide a valid email"],
      required: true,
      lowercase: true,
    },
    photo: String,
    role: {
      type: String,
      enum: [
        "lead-doctor",
        "doctor-training",
        "doctor-Assistant",
        "lead-nurse",
        "nurse",
        "officer",
        "patient",
        "admin",
        "ORadmin",
      ],
      default: "patient",
    },
    major: {
      type: String,
      trim: true,
    },
    phone: [
      {
        type: Number,
      },
    ],
    address: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "please insert a password"],
      minlength: 8,
      select: false,
    },
    passwordChangedAt: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ["female", "male"],
      required: true,
    },
    birthDate: Date,
    schedule: [
      {
        operation: {
          type: mongoose.Schema.ObjectId,
          ref: "Operation",
        },
        start: Date,
        end: Date,
      },
    ],

    Scans: [{ type: String }],
    History: String,
    worksSince: Date,
    emergencyday: {
      type: Number,
      min: 0,
      max: 6,
    },
    type: {
      type: String,
      enum: [
        "Anesthesiologist",
        "Cardiologist",
        "Gastroenterologist",
        "Neurologist",
      ],
    },

    dependent: [
      {
        SSN: {
          type: String,
          unique: true,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        birthDate: Date,
        gender: {
          type: String,
          enum: ["female", "male"],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

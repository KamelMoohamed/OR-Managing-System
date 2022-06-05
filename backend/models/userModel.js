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
        "doctor",
        "lead-nurse",
        "nurse",
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
        type: String,
      },
    ],
    address: String,
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
    birthDate: {
      type: Date,
      required: true,
    },
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
    worksSince: Date,
    emergencyday: {
      type: Number,
      min: 0,
      max: 6,
    },
    department: {
      type: String,
      enum: [
        "Anesthesiologist",
        "Cardiologist",
        "Gastroenterologist",
        "Neurologist",
      ],
    },
    medicalRecord: [
      {
        type: {
          type: String,
          enum: [
            "Blood Pressure",
            "Cholestrol Level",
            "Glucose Level",
            "Scan",
            "Allergy",
            "History",
          ],
          required: true,
        },
        details: String,
        value: String,
        scanImg: String,
      },
    ],
    notification: [
      {
        type: {
          type: String,
          required: [true, "please write the type of notification"],
        },
        message: {
          type: String,
          required: [true, "please write the message"],
        },
        id: {
          type: mongoose.Schema.ObjectId,
        },
        date: {
          type: Date,
          default: Date.now(),
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

const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  SSN: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  fName: {
    type: String,
    required: [true, "the doctor must have first name"],
    trim: true,
    validate: [validator.isAlpha, "User letters only in the name"],
  },
  mName: {
    type: String,
    required: [true, "the doctor must have middle name"],
    trim: true,
    validate: [validator.isAlpha, "User letters only in the name"],
  },
  lName: {
    type: String,
    required: [true, "the doctor must have last name"],
    trim: true,
    validate: [validator.isAlpha, "User letters only in the name"],
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "please provide a valid email"],
    lowercase: true,
  },
  photo: String,
  role: {
    type: String,
    enum: ["Lead-doctor", "training", "Assistant"],
    default: "training",
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
  passwordConfirm: {
    type: String,
    required: [true, "please insert a password"],
    minlength: 8,
    select: false,
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  worksSince: Date,
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
  gender: {
    type: String,
    enum: ["female", "male"],
    required: true,
  },
  birthDate: Date,
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;

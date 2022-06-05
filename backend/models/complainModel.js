const mongoose = require("mongoose");
const validator = require("validator");
const notification = require("../utils/notification.js");

const complainSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "please provide us you name"],
  },
  email: {
    type: String,
    required: [true, "please provide us a working email to contact you back"],
    validate: [validator.isEmail, "Please write a correct email"],
    lowercase: true,
  },
  phone: String,
  complainText: {
    type: String,
    required: [true, "please write your complaint or question"],
  },
  replay: String,
  status: {
    type: String,
    enum: ["open", "To admin", "closed"],
    default: "open",
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

complainSchema.pre("save", async function (next) {
  if (this.isNew)
    await notification.notifyAdmin(
      "New Compliant",
      "New Complaint has been sent to you organization",
      "admin"
    );
  if (this.isModified("status") && this.status === "To admin")
    await notification.notifyAdmin(
      "Forwarded complaint",
      "New Complaint has forwarded to you to reply it",
      "ORadmin"
    );

  next();
});

const Complain = mongoose.model("Complain", complainSchema);
module.exports = Complain;

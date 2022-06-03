const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema(
  {
    SID: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }, //editable by OR admin
    inNeed: {
      type: Boolean,
      default: false,
    },
    needed: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Supply = mongoose.model("Supply", supplySchema);
module.exports = Supply;

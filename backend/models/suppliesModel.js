const mongoose = require("mongoose");

const suppliesSchema = new mongoose.Schema(
  {
    SID: {
      type: Number,
      unique: true,
      required: true,
    },
    name: String,
    quantity: Number, //editable by OR admin
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Supplies = mongoose.model("Supplies", suppliesSchema);
module.exports = Supplies;

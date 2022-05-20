const mongoose = require("mongoose");
const operationSchema = require("./operationModel");
const roomSchema = new mongoose.Schema(
  {
    RID: {
      type: Number,
      unique: true,
      required: [true, "Please include Room Id"],
    },
    rtype: {
      type: String,
      enum: ["Operation", "Recovery", "Storage"],
      required: true,
    },
    capacity: {
      type: Number,
      default: 1,
    },
    operations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Operation",
      },
    ],
    equipments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Equipment",
      },
    ],
    valid: Boolean,
    lastSterilazation: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "operations",
    select: "-__v -_id -id",
  });
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

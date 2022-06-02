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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomSchema.pre(/^find/, function (next) {
  this.populate({
    // ***********selection for this populating is not working**************
    path: "operations",
    select: "reservationTime ",
  }).populate({
    path: "equipments",
    select: "EID name",
  });
  // .populate({
  //   path: "schedule.operation",
  //   select: "name",
  // });
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

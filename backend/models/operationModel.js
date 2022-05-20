const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

const operationSchema = new mongoose.Schema(
  {
    staff: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please mention lead doctor"],
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        required: [true, "Please mention the operation room"],
      },
    ],

    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "Patient",
    },
    supplies: [
      {
        type: {
          type: String,
        },
        Quantity: {
          type: Number,
        },
      },
    ],
    timeTable: [
      {
        start: {
          type: Date,
          required: [true, "Please include operation start time"],
        },
        end: {
          type: Date,
          required: [true, "Please include operation end time"],
        },
        rtype: {
          type: mongoose.Schema.ObjectId,
          ref: "Room",
        },
      },
    ],
    price: Number,
    reservationTime: {
      type: Date,
      default: Date.now(),
    },
    OperationStatus: {
      type: String,
      enum: ["On Schedule", "Done", "Canceled", "Postponed"],
      default: "On Schedule",
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

operationSchema.pre("save", function () {
  console.log(this);
});

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

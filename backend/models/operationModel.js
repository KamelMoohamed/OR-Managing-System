const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Room = require("./roomModel");

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
        type: mongoose.Schema.ObjectId,
        ref: "Supply",
        Quantity: {
          type: Number,
        },
      },
    ],
    timeTable: [
      {
        start: [
          {
            type: Date,
            required: [true, "Please include operation start time"],
          },
        ],
        end: [
          {
            type: Date,
            required: [true, "Please include operation end time"],
          },
        ],
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

operationSchema.pre("save", async function (next) {
  console.log(this);
  await Room.findByIdAndUpdate(this.rooms, {
    $push: { operations: this._id },
  });
  next();
});

//Populating from other documents
operationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "rooms",
    select: "-__v -_id -operations",
  })
    .populate({
      path: "staff",
      select: "-__v -_id ",
    })
    .populate({
      path: "patient",
      select: "-__v -_id ",
    });
  next();
});

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

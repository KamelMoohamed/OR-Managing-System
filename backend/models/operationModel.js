const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Room = require("./roomModel");
const AppError = require("../utils/appError");

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

    start: {
      type: Date,
      required: [true, "Please include operation start time"],
    },
    end: {
      type: Date,
      required: [true, "Please include operation end time"],
    },

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

operationSchema.pre("save", function (next) {
  const staff = this.staff;

  staff.forEach(async (element) => {
    const Schedule = await User.findById(element).select("schedule");
    let times = 0;
    Schedule["schedule"].forEach((element) => {
      if (this.start <= element.end && element.start <= this.end) {
        times = times + 1;
        console.log(times);
        return next(new AppError("there is a reservation at this time", 500));
        return 0;
      }
    });
    if (times == 0) next();
  });
});

operationSchema.pre("save", async function (next) {
  await Room.findByIdAndUpdate(this.rooms, {
    $push: { operations: this._id },
  });
  this.staff.forEach(async (element) => {
    await User.findByIdAndUpdate(element, {
      $in: element,
      $push: { schedule: { start: this.start, end: this.end } },
    });
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
      select: "fName lName role phone ",
    })
    .populate({
      path: "patient",
      select: "-__v -_id ",
    });
  next();
});

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

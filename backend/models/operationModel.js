const mongoose = require("mongoose");
const validator = require("validator");

const operationSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.ObjectId,
      ref: "Doctor",
      required: [true, "Please Metion Lead Doctor"],
    },
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
      },
    ],
    nurses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Nurse",
      },
    ],
    supplies: String,
    timetable: [
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
          type: mongoose.Schema.rtype,
          ref: "Room",
        },
      },
    ],
    price: Number,
    reservationTime: Date,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

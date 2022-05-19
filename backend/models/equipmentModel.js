const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please include the equipment name"],
      trim: true,
    },
    durationBetweenCheckup: {
      type: Number,
      required: [
        true,
        "Please include the least duration between checkups in days",
      ],
    },
    dailyCheckup: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: [true, "Equipment Loction Must be included"], //Could be modified according to admin input
    },
    Checkups: [
      {
        date: {
          type: Date,
          required: [true, "Please include check up date"],
        },
        technicianName: {
          type: String,
          required: true,
        },
        details: {
          type: String,
          required: [true, "Please include all details about this check up"],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;

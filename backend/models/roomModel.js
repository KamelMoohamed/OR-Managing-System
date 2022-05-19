const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    RID: {
      type: Number,
      unique: true,
      required: [true, "Please include Room Id"],
    },
    rtype: {
      type: String,
      enum: ["Operation", "Recovery Room", "Storage"],
      required: true,
    },
    capacity: {
      type: Number,
      default: 1,
    },
    Equipments: [
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

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

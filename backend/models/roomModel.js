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
      enum: ["Operation", "Recovery", "Storage"],
      required: true,
    },
    capacity: {
      type: Number,
      default: 1,
    },
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
    path: "equipments",
    select: "EID name",
  });
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

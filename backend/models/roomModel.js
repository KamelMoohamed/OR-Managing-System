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

roomSchema.virtual("active").get(function () {
  for (var i = this.schedule.length - 1; i >= 0; i--)
    checkTimeBetween(this.schedule[i].start, this.schedule[i].end, new Date())
      ? true
      : false;
});
const checkTimeBetween = (d1, d2, d3) => {
  d3 > d1 && d3 < d2 ? true : false;
};

roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: "equipments",
    select: "EID name",
  });
  next();
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

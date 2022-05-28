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
        room: {
          type: mongoose.Schema.ObjectId,
          ref: "Room",
          required: [true, "Please mention the operation room"],
        },
        start: {
          type: Date,
          required: [true, "please mention the start time "],
        },
        end: {
          type: Date,
          required: [true, "please mention the start time "],
        },
      },
    ],

    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
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

operationSchema.virtual("start").get(function () {
  const rooms = this.rooms;
  return rooms[0].start;
});
operationSchema.virtual("end").get(function () {
  const rooms = this.rooms;
  return rooms[rooms.length - 1].end;
});

operationSchema.pre("findOneAndUpdate", async function (next) {
  const { _id } = this.getQuery();
  const doc = await Operation.findById(_id);
  doc.staff.forEach(async (element) => {
    const Schedule = await User.findById(element).select("schedule");
    let count = 0;

    Schedule["schedule"].forEach((element) => {
      if (element.operation.equals(doc._id)) {
        count += 1;
      }
    });
    await User.findById(element, function (err, document) {
      document.schedule[count] = {
        start: doc.start,
        end: doc.end,
        operation: doc._id,
      };
      document.markModified("schedule");
      document.save();
    }).clone();
  });
  const Pschedule = doc.patient["schedule"];
  let count = 0;

  Pschedule.forEach((element) => {
    if (element.operation.equals(doc._id)) {
      count += 1;
    }
  });
  await User.findById(doc.patient._id, function (err, document) {
    console.log(document.schedule);
    document.schedule[count] = {
      start: doc.start,
      end: doc.end,
      operation: doc._id,
    };
    document.markModified("schedule");
    document.save();
  }).clone();

  doc.rooms.forEach(async (element) => {
    const Schedule = await Room.findById(element.room).select("schedule");
    let count = 0;
    let counter = 0;
    Schedule["schedule"].forEach((element) => {
      if (element.operation.equals(doc._id)) {
        count += 1;
      }
    });
    await Room.findById(element.room, function (err, document) {
      document.schedule[count] = {
        start: doc.rooms[counter].start,
        end: doc.rooms[counter].end,
        operation: doc._id,
      };
      document.markModified("schedule");
      document.save();
    }).clone();
    counter += 1;
  });
});

operationSchema.pre("save", function (next) {
  const staff = this.staff;

  staff.forEach(async (element) => {
    const Schedule = await User.findById(element).select("schedule");
    let times = 0;
    Schedule["schedule"].forEach((element) => {
      if (this.start <= element.end && element.start <= this.end) {
        times = times + 1;
        return next(new AppError("there is a reservation at this time", 500));
        return 0;
      }
    });
    if (times == 0) next();
  });
});
operationSchema.pre("save", function (next) {
  const rooms = this.rooms;

  rooms.forEach(async (element) => {
    const Schedule = await Room.findById(element.room).select("schedule");
    let times = 0;
    Schedule["schedule"].forEach((element) => {
      if (this.start <= element.end && element.start <= this.end) {
        times = times + 1;
        return next(new AppError("there is a reservation at this time", 500));
        return 0;
      }
    });
    if (times == 0) next();
  });
});

operationSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.rooms.forEach(async (element) => {
    await Room.findByIdAndUpdate(element.room, {
      $push: {
        schedule: {
          start: element.start,
          end: element.end,
          operation: this._id,
        },
      },
    });
  });
  this.rooms.forEach(async (element) => {
    await Room.findByIdAndUpdate(element.room, {
      $push: { operations: this._id },
    });
  });
  await User.findByIdAndUpdate(this.patient, {
    $push: {
      schedule: { start: this.start, end: this.end, operation: this._id },
      operations: this._id,
    },
  });

  this.staff.forEach(async (element) => {
    await User.findByIdAndUpdate(element, {
      $push: {
        schedule: { start: this.start, end: this.end, operation: this._id },
      },
    });
  });

  next();
});

operationSchema.pre("findOneAndDelete", async function (next) {
  const doc = await Operation.findById(this.getQuery()._id);
  doc.staff.forEach(async (element) => {
    console.log(element);
    await User.findByIdAndUpdate(
      element.id,
      {
        $pull: {
          schedule: { operation: doc._id },
        },
      },
      { multi: true }
    );
  });
  doc.rooms.forEach(async (element) => {
    console.log(element);
    await Room.findByIdAndUpdate(
      element.room,
      {
        $pull: {
          schedule: { operation: doc._id },
        },
      },
      { multi: true }
    );
  });
  await User.findByIdAndUpdate(
    doc.patient.id,
    { $pull: { schedule: { operation: doc._id } } },
    { multi: true }
  );

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
      select: "-__v ",
    });
  next();
});

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

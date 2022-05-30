const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Room = require("./roomModel");
const Equipment = require("./equipmentModel");
const AppError = require("../utils/appError");
const Scheduling = require("./../utils/Scheduling");
const req = require("express/lib/request");

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
    equipments: [
      {
        equip: {
          type: mongoose.Schema.ObjectId,
          ref: "Equipment",
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

// operationSchema.pre("findOneAndUpdate", async function () {
//   const { _id } = this.getQuery();
//   const doc = await Operation.findById(_id);
//   req.rooms = doc.rooms;
// });

// Updating staff, rooms, and patient schedule when updating operation
operationSchema.post("findOneAndUpdate", async function () {
  const { _id } = this.getQuery();
  const doc = await Operation.findById(_id);
  // const removedRooms = Scheduling.checkRoomChange(req.rooms, doc.rooms);
  // if (removedRooms) {
  //   for (element of removedRooms) {
  //     await Scheduling.deleteSchedule(doc, Room, element.room, element.start);
  //   }
  // }
  for (element of doc.staff) {
    await Scheduling.updateSchedule(doc, User, element, doc.start, doc.end);
  }
  await Scheduling.updateSchedule(doc, User, doc.patient, doc.start, doc.end);
  let i = 0;
  for (element of doc.rooms) {
    await Scheduling.updateSchedule(
      doc,
      Room,
      element.room,
      doc.rooms[i].start,
      doc.rooms[i].end
    );
    i += 1;
  }
});

// Check if any of staff, rooms, and patient has a reservation during operation
operationSchema.pre("save", async function (next) {
  const staff = this.staff;

  for (element of staff) {
    await Scheduling.checkUserSchedule(this, User, element, next);
  }
  await Scheduling.checkUserSchedule(this, User, this.patient, next);
  const rooms = this.rooms;
  for (element of rooms) {
    await Scheduling.checkRoomSchedule(
      element.start,
      element.end,
      Room,
      element.room,
      next
    );
  }
  const equips = this.equipments;
  for (element of equips) {
    await Scheduling.checkRoomSchedule(
      element.start,
      element.end,
      Equipment,
      element.equip,
      next
    );
  }
  next();
});

// adding Schedule to staff, rooms, and patient before creating the operation
operationSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  for (element of this.rooms) {
    await Scheduling.addRoomSchedule(this, Room, element);
  }
  for (element of this.equipments) {
    await Scheduling.addRoomSchedule(this, Equipment, element);
  }
  await Scheduling.addUserSchedule(this, User, this.patient);
  for (element of this.staff) {
    await Scheduling.addUserSchedule(this, User, element);
  }
  next();
});

// deleting the schedule from staff, rooms, and patient before deleting operation
operationSchema.pre("findOneAndDelete", async function (next) {
  const doc = await Operation.findById(this.getQuery()._id);
  for (element of doc.staff) {
    await Scheduling.deleteSchedule(doc, User, element.id);
  }
  for (element of doc.rooms) {
    await Scheduling.deleteSchedule(doc, Room, element.room);
  }
  for (element of doc.equipments) {
    await Scheduling.deleteSchedule(doc, Equipment, element.room);
  }
  await Scheduling.deleteSchedule(doc, User, doc.patient);

  next();
});

//Populating from other documents
operationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "rooms",
    select: "-__v -_id -operations",
  })
    .populate({
      path: "equipments",
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

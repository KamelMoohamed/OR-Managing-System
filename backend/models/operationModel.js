const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");
const Room = require("./roomModel");
const Equipment = require("./equipmentModel");
const Scheduling = require("./../utils/Scheduling");
const notification = require("./../utils/notification");
const req = require("express/lib/request");
const AppError = require("../utils/appError");
const Supply = require("./../models/supplyModel");

const operationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Emergency", "Outpatient"],
      required: true,
    },
    details: String,
    department: {
      type: String,
      enum: ["Cardiology", "Gastroenterology", "Neurology"],
    },
    staff: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    staffSSN: [
      {
        type: String,
      },
    ],
    rooms: [
      {
        room: {
          type: mongoose.Schema.ObjectId,
          ref: "Room",
        },
        RID: {
          type: Number,
          required: true,
        },
        start: {
          type: Date,
          required: [true, "please mention the start time "],
        },
        end: {
          type: Date,
          required: [true, "please mention the end time "],
        },
      },
    ],
    equipments: [
      {
        equip: {
          type: mongoose.Schema.ObjectId,
          ref: "Equipment",
        },
        equipID: {
          type: Number,
          required: true,
        },
        start: {
          type: Date,
          required: [true, "please mention the start time "],
        },
        end: {
          type: Date,
          required: [true, "please mention the end time "],
        },
      },
    ],

    patient: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      defualt: async function () {
        doc = await User.findOne({ SSN: this.patientSSN });
        console.log(doc);
        return doc.id;
      },
    },
    patientSSN: {
      type: String,
      required: true,
    },
    supplies: [
      {
        id: {
          type: mongoose.Schema.ObjectId,
          ref: "Supply",
        },
        SID: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: [true, "please enter supply quanitity"],
        },
      },
    ],

    cost: Number,
    reservationTime: {
      type: Date,
      default: Date.now(),
    },
    OperationStatus: {
      type: String,
      enum: ["On Schedule", "Done", "Canceled", "Postponed", "Pending"],
      default: "Pending",
    },
    patientAcceptance: {
      type: String,
      enum: ["Pending", "Accept", "Refuse"],
      default: "Pending",
    },
    doctorAcceptance: {
      type: String,
      enum: ["Pending", "Accept", "Refuse"],
      default: "Pending",
    },
    mainDoctor: {
      //same doctor sending the request
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    mainDoctorSSN: {
      type: String,
      required: true,
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

operationSchema.pre("save", async function (next) {
  //adding doctor id
  const mainDoctor = await User.findOne({ SSN: this.mainDoctorSSN });
  if (!mainDoctor)
    return next(new AppError("there is no Doctor with this SSN", 404));
  this.mainDoctor = mainDoctor.id;

  // adding patient id
  const patient = await User.findOne({ SSN: this.patientSSN });
  if (!patient)
    return next(new AppError("there is no patient with this SSN", 404));
  this.patient = patient.id;

  // adding staff ids
  let staff = [];
  for (let user of this.staffSSN) {
    console.log(user);
    const Doc = await User.findOne({ SSN: user });
    if (!Doc) return next(new AppError("there is no staff with this SSN", 404));
    staff.push(Doc.id);
  }
  this.staff = staff;

  // adding rooms ids
  let rooms = [];
  for (let room of this.rooms) {
    roomId = await Room.findOne({ RID: room.RID });
    doc = {
      RID: room.RID,
      room: roomId.id,
      start: room.start,
      end: room.end,
    };
    rooms.push(doc);
  }

  this.rooms = rooms;

  // adding supplies Ids
  let Supplies = [];
  for (let sup of this.supplies) {
    supp = await Supplies.findOne({ SID: sup.SID });
    doc = {
      SID: sup.SID,
      id: supp.id,
      quantity: sup.quantity,
    };
    Supplies.push(doc);
  }

  this.supplies = Supplies;
  // adding equipment Ids
  let equipment = [];
  for (let eq of this.equipments) {
    equipment = await Equipment.findOne({ EID: sup.equipID });
    doc = {
      equip: equipment.id,
      equipID: eq.equipID,
      start: eq.start,
      end: eq.end,
    };
    equipment.push(doc);
  }

  this.equipments = this.equipments;
});
// Updating staff, rooms, and patient schedule when updating operation
operationSchema.post("findOneAndUpdate", async function () {
  const { _id } = this.getQuery();
  const doc = await Operation.findById(_id);

  const removedRooms = Scheduling.checkRoomChange(req.rooms, doc.rooms);
  if (removedRooms) {
    for (element of removedRooms) {
      await Scheduling.deleteSchedule(doc, Room, element.room, element.start);
    }
  }
  for (element of doc.staff) {
    await Scheduling.updateSchedule(doc, User, element, doc.start, doc.end);
    await notification.notify(
      [element.id],
      "warning-warning",
      `your have an updated operation`,
      _id
    );
  }
  await Scheduling.updateSchedule(
    doc,
    User,
    doc.mainDoctor,
    doc.start,
    doc.end
  );
  await Scheduling.updateSchedule(doc, User, doc.patient, doc.start, doc.end);
  await Scheduling.updateSchedule(
    doc,
    User,
    doc.mainDoctor,
    doc.start,
    doc.end
  );
  await notification.notify(
    [doc.patient, doc.mainDoctor],
    "warning-warning",
    `your have an updated operation`,
    _id
  );
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
  if (this.isModified("OperationStatus") && this.OperationStatus == "Done")
    return next();
  for (element of staff) {
    await Scheduling.checkUserSchedule(this, User, element, next);
  }
  await Scheduling.checkUserSchedule(this, User, this.patient, next);
  await Scheduling.checkUserSchedule(this, User, this.mainDoctor, next);
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
  req.rooms = this.rooms;
  next();
});

// adding Schedule to staff, rooms, and patient before creating the operation
operationSchema.pre("save", async function (next) {
  if (this.isModified("OperationStatus") && this.OperationStatus == "Done")
    return next();
  if (
    this.doctorAcceptance === "Pending" &&
    this.patientAcceptance === "Pending"
  ) {
    await notification.notify(
      [this.patient, this.mainDoctor],
      "quiz",
      `You have new operation to accept`,
      this.id
    );
  }

  if (
    this.doctorAcceptance === "Accept" &&
    this.patientAcceptance === "Accept"
  ) {
    this.OperationStatus = "On Schedule";
    if (
      !(
        this.isModified("doctorAcceptance") ||
        this.isModified("patientAcceptance")
      )
    )
      return next();

    for (element of this.rooms) {
      await Scheduling.addRoomSchedule(this, Room, element);
    }
    for (element of this.equipments) {
      await Scheduling.addRoomSchedule(this, Equipment, element);
    }
    await Scheduling.addUserSchedule(this, User, this.patient);
    await Scheduling.addUserSchedule(this, User, this.mainDoctor);
    await notification.notify(
      [this.patient, this.mainDoctor],
      "done",
      `there is a new operation has been added to your schedule`,
      this.id
    );
    for (element of this.staff) {
      await Scheduling.addUserSchedule(this, User, element);
      await notification.notify(
        [element.id],
        "done",
        `there is a new operation has been added to your schedule`,
        this.id
      );
    }

    next();
  } else next();
});

// deleting the schedule from staff, rooms, and patient before deleting operation
operationSchema.pre("findOneAndDelete", async function (next) {
  const doc = await Operation.findById(this.getQuery()._id);
  for (element of doc.staff) {
    await Scheduling.deleteSchedule(doc, User, element);
    await notification.notify(
      [element.id],
      "warning-error",
      `your operation from ${doc.start.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      })} to ${doc.end.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      })} has been canceled`
    );
  }
  for (element of doc.rooms) {
    await Scheduling.deleteSchedule(doc, Room, element.room);
  }
  for (element of doc.equipments) {
    await Scheduling.deleteSchedule(doc, Equipment, element.room);
  }
  await Scheduling.deleteSchedule(doc, User, doc.patient);
  await Scheduling.deleteSchedule(doc, User, doc.mainDoctor);
  await notification.notify(
    [this.patient, this.mainDoctor],
    "warning-error",
    `your operation from ${doc.start.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    })} to ${doc.end.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    })} has been canceled`
  );

  next();
});

//Populating from other documents
operationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "equipments.equip",
    select: "EID name",
  })
    .populate({
      path: "staff",
      select: "name role SSN",
    })
    .populate({
      path: "patient",
      select: "name SSN phone birthDate",
    })
    .populate({
      path: "supplies.id",
      select: "SID name",
    })
    .populate({
      path: "mainDoctor",
      select: "SSN name department",
    });
  next();
});

const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation;

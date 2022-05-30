const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const Room = require("./roomModel");

const equipmentSchema = new mongoose.Schema(
  {
    EID: {
      type: Number,
      required: [true, "Please include equipment Id"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please include the equipment name"],
      trim: true,
    },
    factory: String,
    type: {
      type: String,
      enum: ["Static", "Dynamic"],
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
    previousRoom: {
      // Atribute for static equip
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      default: function () {
        return this.room;
      },
      select: false,
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
        },
      },
    ],
    schedule: [
      // Atribute for dynamic equip
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

equipmentSchema.pre("save", async function (next) {
  Room.findByIdAndUpdate(
    this.room,
    {
      $push: {
        equipments: {
          equipment: this.id,
        },
      },
    },
    (err) => {
      return next(new AppError("there is no room with this Id", 400));
    }
  );
});

equipmentSchema.pre("findOneAndDelete", async function (next) {
  const { _id } = this.getQuery();
  const doc = await Equipment.findById(_id);
  if (!doc)
    return next(new AppError("there is no Equipment with that id", 500));
  await Room.findByIdAndUpdate(
    doc.room,
    { $pull: { equipments: { equipment: doc._id } } },
    { multi: true }
  );

  next();
});

equipmentSchema.pre("findOneAndUpdate", async function (next) {
  const { _id } = this.getQuery();
  const doc = await Equipment.findById(_id).select("previousRoom room");
  if (!doc)
    return next(new AppError("there is no Equipment with that id", 500));
  await Room.findByIdAndUpdate(
    doc.previousRoom,
    { $pull: { equipments: { equipment: doc._id } } },
    { multi: true }
  );
  Room.findByIdAndUpdate(
    doc.room,
    {
      $push: {
        equipments: {
          equipment: doc._id,
        },
      },
    },
    (err) => {
      return next(new AppError("there is no room with this Id", 500));
    }
  );
  next();
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
module.exports = Equipment;

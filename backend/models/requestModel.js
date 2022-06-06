const mongoose = require("mongoose");
const User = require("./userModel");
const notification = require("./../utils/notification");

const requestSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  duration: [
    {
      roomType: String,
      duration: Number, //in Hours
    },
  ],
  patientSSN: {
    type: String,
    required: [true, "The request needs a patient"],
    validate: [
      async function (patientSSN) {
        patient = await User.findOne({ SSN: patientSSN });
        if (patient) return true;
        return false;
      },
      "No user found with this SSN",
    ],
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Insurance"],
  },
  nurseSSN: {
    type: String,
    required: [true, "Please Mention nurse for this request"],
    validate: [
      async function (nurseSSN) {
        nurse = await User.findOne({ SSN: nurseSSN, role: "lead-nurse" });
        if (nurse) return true;
        return false;
      },
      "No Nurse found with this SSN",
    ],
  },

  supplies: [
    {
      name: String,
      Quantity: Number,
    },
  ],

  status: {
    type: String,
    enum: ["Approved", "Admin Pending", "Nurse Pending"],
    default: "Nurse Pending",
  },
});

requestSchema.virtual("nurse").get(async function () {
  const nurseId = await User.findOne({ SSN: this.nurseSSN }).select("id");
  return nurseId;
});
requestSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  await notification.notify(
    this.nurse,
    "warning-warning",
    "You have a new operation request to finish",
    this.id
  );
});
requestSchema.post("findOneAndUpdate", async function (next) {
  const { _id } = this.getQuery();
  const doc = await Request.findById(_id);
  if ((doc.status = "Admin Pending")) {
    await notification.notifyAdmin(
      "warning-error",
      "you have a completed request for an operation",
      "ORadmin",
      doc.id
    );
  }
});
requestSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "doctor",
    select: "name SSN",
  }).populate({
    path: "nurseSSN",
    select: "name SSN",
  });
  next();
});

requestSchema.pre("findOneAndUpdate", () => {
  if (req.body.user == "lead-nurse") this.status = "Admin Pending";
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;

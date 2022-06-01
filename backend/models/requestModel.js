const mongoose = require("mongoose");
const User = require("./userModel");
const validator = require("validator");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: [true, "the operation needs a name"] },
  doctor: {
    type: mongoose.Schema.ObjectId,
    req: "User",
  },
  duration: [
    {
      roomType: String,
      duration: Number, //in Hours
    },
  ],
  patientSSN: {
    type: Number,
    required: [true, "The request needs a patient"],
    validate: [
      async function (patientSSN) {
        patient = await User.findOne({ SSN: patientSSN });
        if (patient) return true;
        return false;
      },
      "No patient found with this SSN",
    ],
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Insurance"],
    required: [true, "please mention payment method"],
  },
  nurseSSN: {
    type: Number,
    required: [true, "Please Mention nurse for this request"],
    validate: [
      async function (nurseSSN) {
        nurse = await User.findOne({ SSN: nurseSSN });
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
    enum: ["Approved", " Admin Pending", "Nurse Pending"],
    default: "Nurse Pending",
  },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;

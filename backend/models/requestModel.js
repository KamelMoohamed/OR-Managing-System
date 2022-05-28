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
  status: {
    type: String,
    enum: ["Approved", "Pending"],
    default: "Pending",
  },
});

requestSchema.post("save", async function () {
  await User.findByIdAndUpdate(this.doctor, {
    $push: {
      pendingRequests: this._id,
    },
  });
});

requestSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  //console.log(this.r.doctor);

  if (this.r.status !== "Pending") {
    await User.findByIdAndUpdate(this.r.doctor, {});
  }
  next();
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;

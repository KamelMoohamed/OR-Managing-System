const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: [true, "the operation needs a name"] },
  doctor: {
    type: mongoose.Schema.ObjectId,
    req: "User",
    required: [true, "the request needs a doctor"],
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
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Insurance"],
    required: [true, "please mention payment method"],
  },
});

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;

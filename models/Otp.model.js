const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OtpSchema = new Schema({
  phoneNumber: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default:false
  },
  type: {
    type: String,
    required: true,
    default:"LOGIN"
  }
});
module.exports = mongoose.model("Otp", OtpSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum:["GROOM","BRIDE"],
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  motherTongue: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    enum:["SINGLE","MARRIED"],
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  cast: {
    type: String,
    required: true,
  },
  birthStart: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    enum:["NONVEGITERIAN","VEGITERIAN","BOTH"],
    required: true,
  },
  drinkType: {
    type: String,
    required: true,
  },
  smoker: {
    type: String,
    enum:["NONSMOKER","SMOKER"],
    required: true,
  },
  ideologies: {
    type: String,
    required: true,
  },
  hobbies: {
    type: Array,
    required: true,
  },
  profileImage: {
    type: Array,
    required: true,
  },
  setting: {
    showFullname: {
      type: Boolean,
      required: true,
    },
    showDob: {
      type: Boolean,
      required: true,
    },
    showLocation: {
      type: Boolean,
      required: true,
    },
  },
  referralCode: {
    type: String
  },
  referralUserId: {
    type: Object
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", UserSchema);

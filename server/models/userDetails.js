const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const userDetailsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  preferences: String,
  accountInformation: String,
  theme: String,
  emailNotifications: Boolean,
  registrationDate: { type: Date, default: Date.now },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

module.exports = Model("UserDetails", userDetailsSchema);

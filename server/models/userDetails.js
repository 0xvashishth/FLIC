const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
  preferences: { type: String },
  accountInformation: { type: String },
  theme: { type: String, default: "white" },
  emailNotifications: { type: Boolean, default: true },
  registrationDate: { type: Date, default: Date.now },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
module.exports = UserDetails;

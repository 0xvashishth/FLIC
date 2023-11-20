const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  formURL: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now },
  isPremiumForm: { type: Boolean, default: false },
  requestCount: { type: Number, default: 0 },
  description: String,
  redirectUrl: { type: String },
  AllowedOrigins: [String],
  isEnabled: { type: Boolean, default: true },
  isEmailNotification: { type: Boolean, default: true },
  tags: [String],
  isReported: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
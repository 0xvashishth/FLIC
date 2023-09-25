const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Model = mongoose.model;

const urlSchema = new Schema({
  originalURL: { type: String, required: true },
  shortenedURL: { type: String, unique: true, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: { type: Date, default: Date.now },
  isPremiumUrl: { type: Boolean, default:false},
  clickCount: { type: Number, default: 0 },
  description: String,
  tags: [String],
  isReported: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  qrCodeImageUrl: { type: String, required: false, default: ""},
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

module.exports = Model("Url", urlSchema);

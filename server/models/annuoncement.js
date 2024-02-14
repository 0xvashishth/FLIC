const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Announcement schema !!
const announcementSchema = new Schema({
  title: String,
  description: String,
  creationDate: { type: Date, default: Date.now },
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Announcement", required: false},
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});


const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
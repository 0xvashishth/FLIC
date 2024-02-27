const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatTitle: {
    type: String,
    required: true,
  },
  chatCreated: { type: Date, default: Date.now },
  department: { type: String, default: "default" },
  priority: { type: String, default: "low" }, // 'high', 'medium', 'low'
  tags: [
    {
      type: String,
    },
  ],
  sessionCount: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
  },
  AllowedOrigins: [String],
  isEnabled: { type: Boolean, default: true },
  defaultAskQuestion: { type: String, required: true },
  isEmailNotification: { type: Boolean, default: true },
  isReported: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatName: {
    type: String,
    require: true,
  },
  chatCreated: { type: Date, default: Date.now },
  department: { type: String },
  priority: { type: String }, // 'high', 'medium', 'low'
  tags: [
    {
      type: String, // The type of each element in the array is a string.
    },
  ],
  sessionCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String, // e.g., 'active', 'closed', 'pending'
    default: "active",
  },
  notes: {
    type: String, // The type of each element in the array is a string.
  },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

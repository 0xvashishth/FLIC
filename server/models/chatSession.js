const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSessionSchema = new Schema({
  chatID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  chatSessionCreated: { type: Date, default: Date.now },
  chatSessionId: {
    type: String,
    // required: true,
  },
  message: [
    {
      type: {
        type: String,
        default: "admin",
      },
      msg: {
        type: String,
        required: true, // You can make the URL required if needed
      },
      timestamp: {
        type: Date,
        default: Date.now, // Default to the current timestamp when not provided
      },
    },
  ],
  closedBy: {
    type: String, // agent(reference user) or user
  },
  closedReason: {
    type: String,
  },
  // there is no meaning of it currently
  //   status: {
  //     type: String, // e.g., 'active', 'closed', 'pending'
  //     default: "active",
  //   },
  ratingByAgent: {
    type: Number,
  },
  ratingByUser: {
    type: Number,
  },
  reviewByUser: {
    type: String,
  },
  notes: {
    type: String,
  },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

module.exports = ChatSession;

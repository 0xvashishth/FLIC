const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTimestamp: { type: Date, default: Date.now },
  endTimestamp: { type: Date, default: Date.now },
  duration: { type: Date },
  department: { type: String },
  priority: { type: String }, // 'high', 'medium', 'low'
  tags: [
    {
      type: String, // The type of each element in the array is a string.
    },
  ],
  message: [
    {
      isAttachement: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        required: true, // You can make the URL required if needed
      },
      createdAt: {
        type: Date,
        default: Date.now, // Default to the current timestamp when not provided
      },
    },
  ],
  closedBy: {
    type: String, // agent(reference user) or user
  },
  closedReason: {
    type: String
  },
  queueNumber: {
    type: Number // the number on which this chat is currently there
  },
  status: {
    type: String, // e.g., 'active', 'closed', 'pending'
    default: 'active',
  },
  ratingByAgent: {
    type: Number,
  },
  ratingByUser: {
    type: Number,
  },
  reviewByUser: {
    type: String,
  },
  notes: [
    {
        type: String, // The type of each element in the array is a string.
    },
  ]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
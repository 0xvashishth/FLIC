const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  activityType: String, // Type of activity (e.g., 'form_submission', 'link_click', 'chat_start')
  timestamp: {
    type: Date,
    default: Date.now,
  },
  onActivityId: {
     type: Schema.Types.ObjectId,
  },
  note: {
    type: String
  },
  form: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  chat: {
    type: String,
    required: false
  },
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;

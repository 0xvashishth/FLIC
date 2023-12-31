const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formDetailsSchema = new Schema({
  FormID: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  requestDate: { type: Date, default: Date.now },
  dynamicData: Schema.Types.Mixed,
  requestOrigin: String,
  Parameter1: String,
  Parameter2: String,
  Parameter3: Boolean,
  Parameter4: Boolean,
  Parameter5: Date,
});

const FormDetails = mongoose.model('FormDetails', formDetailsSchema);

module.exports = FormDetails;
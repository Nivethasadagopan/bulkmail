const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  recipients: [{ type: String, required: true }],
  status: { type: String, enum: ['success','failure'], required: true },
  errorMessage: { type: String }, // optional
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailLog', EmailLogSchema);

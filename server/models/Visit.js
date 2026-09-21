const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString() },
    dateLabel: String,
    doctor: String,
    vitals: String,
    conditions: String,
    medications: String,
    notes: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model('Visit', visitSchema, 'visits');

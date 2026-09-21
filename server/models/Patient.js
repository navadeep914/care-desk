const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    _id: { type: String }, // custom id, e.g. "P1001"
    name: { type: String, required: true },
    age: String,
    gender: String,
    blood: String,
    phone: String,
    emergency: String,
    address: String,
    allergies: String,
    medications: String,
    history: String,
    labSummary: String,
    labUpdatedAt: String,
    fingerprintTemplateId: { type: Number, unique: true, sparse: true },
    registeredAt: { type: String, default: () => new Date().toISOString() },
    registeredBy: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model('Patient', patientSchema);

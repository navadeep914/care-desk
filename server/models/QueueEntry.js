const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    status: { type: String, default: 'waiting' }, // waiting | in-consult | done
    priority: { type: String, default: 'normal' }, // normal | urgent
    token: { type: Number },
    checkedInAt: { type: String, default: () => new Date().toISOString() },
  },
  { versionKey: false }
);

module.exports = mongoose.model('QueueEntry', queueSchema, 'queue');

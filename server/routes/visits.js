const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');
const Patient = require('../models/Patient');
const QueueEntry = require('../models/QueueEntry');
const { serializeVisit } = require('../utils/serialize');

// GET /api/visits[?patient_id=P1001]
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.patient_id) filter.patientId = String(req.query.patient_id).toUpperCase();
  const rows = await Visit.find(filter).sort({ date: -1 }).lean();
  res.json(rows.map(serializeVisit));
});

// POST /api/visits — also auto-closes the patient's active queue entry
router.post('/', async (req, res) => {
  const patientId = String(req.body.patientId || '').toUpperCase();
  const patient = await Patient.findById(patientId).lean();
  if (!patient) return res.status(404).json({ error: 'No patient with that ID' });

  const visit = await Visit.create({
    patientId: patient._id,
    patientName: patient.name,
    date: new Date().toISOString(),
    dateLabel: new Date().toDateString(),
    doctor: req.body.doctor || '',
    vitals: req.body.vitals || '',
    conditions: req.body.conditions || '',
    medications: req.body.medications || '',
    notes: req.body.notes || '',
  });

  const active = await QueueEntry.findOne({ patientId: patient._id, status: { $ne: 'done' } }).sort({ token: -1 });
  if (active) {
    active.status = 'done';
    await active.save();
  }

  res.status(201).json(serializeVisit(visit));
});

module.exports = router;

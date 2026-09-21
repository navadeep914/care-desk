const express = require('express');
const router = express.Router();
const QueueEntry = require('../models/QueueEntry');
const Patient = require('../models/Patient');
const { serializeQueue } = require('../utils/serialize');

// GET /api/queue
router.get('/', async (req, res) => {
  const rows = await QueueEntry.find().sort({ token: 1 }).lean();
  res.json(rows.map(serializeQueue));
});

// POST /api/queue
router.post('/', async (req, res) => {
  const patientId = String(req.body.patientId || '').toUpperCase();
  const patient = await Patient.findById(patientId).lean();
  if (!patient) return res.status(404).json({ error: 'No patient with that ID' });

  const maxTokenDoc = await QueueEntry.findOne().sort({ token: -1 }).lean();
  const token = (maxTokenDoc && maxTokenDoc.token ? maxTokenDoc.token : 0) + 1;

  const entry = await QueueEntry.create({
    patientId: patient._id,
    patientName: patient.name,
    status: 'waiting',
    priority: req.body.priority || 'normal',
    token,
    checkedInAt: new Date().toISOString(),
  });
  res.status(201).json(serializeQueue(entry));
});

// PATCH /api/queue/:id
router.patch('/:id', async (req, res) => {
  const update = {};
  if (req.body.status !== undefined) update.status = req.body.status;
  if (req.body.priority !== undefined) update.priority = req.body.priority;
  const entry = await QueueEntry.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
  if (!entry) return res.status(404).json({ error: 'No queue entry with that ID' });
  res.json(serializeQueue(entry));
});

module.exports = router;

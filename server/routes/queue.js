const express = require('express');
const router = express.Router();
const store = require('../db/store');
const { serializeQueue } = require('../utils/serialize');

// GET /api/queue
router.get('/', async (req, res) => {
  try {
    const rows = await store.getQueue();
    res.json(rows.map(serializeQueue));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/queue
router.post('/', async (req, res) => {
  const patientId = String(req.body.patientId || '').toUpperCase();
  try {
    const patient = await store.getPatientById(patientId);
    if (!patient) return res.status(404).json({ error: 'No patient with that ID' });

    const entry = await store.addQueueEntry({
      patientId: patient.id,
      patientName: patient.name,
      priority: req.body.priority || 'normal',
    });
    res.status(201).json(serializeQueue(entry));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/queue/:id
router.patch('/:id', async (req, res) => {
  const update = {};
  if (req.body.status !== undefined) update.status = req.body.status;
  if (req.body.priority !== undefined) update.priority = req.body.priority;

  try {
    const entry = await store.updateQueueEntry(req.params.id, update);
    if (!entry) return res.status(404).json({ error: 'No queue entry with that ID' });
    res.json(serializeQueue(entry));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

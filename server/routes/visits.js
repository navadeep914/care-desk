const express = require('express');
const router = express.Router();
const store = require('../db/store');
const { serializeVisit } = require('../utils/serialize');

// GET /api/visits[?patient_id=P1001]
router.get('/', async (req, res) => {
  try {
    const rows = await store.getVisits(req.query.patient_id);
    res.json(rows.map(serializeVisit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/visits — auto-closes the patient's active queue entry
router.post('/', async (req, res) => {
  const patientId = String(req.body.patientId || '').toUpperCase();
  try {
    const patient = await store.getPatientById(patientId);
    if (!patient) return res.status(404).json({ error: 'No patient with that ID' });

    const visit = await store.createVisit({
      patientId: patient.id,
      patientName: patient.name,
      date: new Date().toISOString(),
      dateLabel: new Date().toDateString(),
      doctor: req.body.doctor || '',
      vitals: req.body.vitals || '',
      conditions: req.body.conditions || '',
      medications: req.body.medications || '',
      notes: req.body.notes || '',
    });

    res.status(201).json(serializeVisit(visit));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

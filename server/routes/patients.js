const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { serializePatient } = require('../utils/serialize');

async function nextPatientId() {
  const patients = await Patient.find({}, { _id: 1 }).lean();
  let max = 1000;
  patients.forEach((p) => {
    const digits = String(p._id || '').replace(/[^0-9]/g, '');
    if (digits && Number(digits) > max) max = Number(digits);
  });
  return 'P' + (max + 1);
}

// GET /api/patients
router.get('/', async (req, res) => {
  const patients = await Patient.find().sort({ registeredAt: -1 }).lean();
  res.json(patients.map(serializePatient));
});

// GET /api/patients/:id
router.get('/:id', async (req, res) => {
  const p = await Patient.findById(req.params.id.toUpperCase()).lean();
  if (!p) return res.status(404).json({ error: 'No patient with that ID' });
  res.json(serializePatient(p));
});

// POST /api/patients
router.post('/', async (req, res) => {
  const { name, age } = req.body || {};
  if (!name || !age) return res.status(400).json({ error: 'name and age are required' });

  const id = await nextPatientId();
  const patient = await Patient.create({
    _id: id,
    name,
    age,
    gender: req.body.gender || '',
    blood: req.body.blood || '',
    phone: req.body.phone || '',
    emergency: req.body.emergency || '',
    address: req.body.address || '',
    allergies: req.body.allergies || '',
    medications: req.body.medications || '',
    history: req.body.history || '',
    registeredAt: new Date().toISOString(),
    registeredBy: req.body.registeredBy || 'Front Desk',
  });
  res.status(201).json(serializePatient(patient));
});

// PATCH /api/patients/:id
router.patch('/:id', async (req, res) => {
  const id = req.params.id.toUpperCase();
  const update = {};
  const allowed = ['name', 'age', 'gender', 'blood', 'phone', 'emergency', 'address', 'allergies', 'medications', 'history'];
  allowed.forEach((f) => {
    if (req.body[f] !== undefined) update[f] = req.body[f];
  });
  if (req.body.labSummary !== undefined) {
    update.labSummary = req.body.labSummary;
    update.labUpdatedAt = new Date().toISOString();
  }
  const p = await Patient.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!p) return res.status(404).json({ error: 'No patient with that ID' });
  res.json(serializePatient(p));
});

module.exports = router;

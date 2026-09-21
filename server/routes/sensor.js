const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { serializePatient } = require('../utils/serialize');

// POST /api/enroll
// Called by the ESP32 once the R307/AS608 sensor has stored a new
// fingerprint template for a patient already registered in CareDesk.
// Body: { "patient_id": "P1001", "template_id": 7 }
router.post('/enroll', async (req, res) => {
  const { patient_id, template_id } = req.body || {};
  if (!patient_id || template_id === undefined) {
    return res.status(400).json({ error: 'patient_id and template_id are required' });
  }
  const id = String(patient_id).toUpperCase();

  const clash = await Patient.findOne({ fingerprintTemplateId: template_id, _id: { $ne: id } });
  if (clash) {
    return res.status(400).json({ error: `That template_id is already linked to patient ${clash._id}` });
  }

  const p = await Patient.findByIdAndUpdate(id, { fingerprintTemplateId: template_id }, { new: true }).lean();
  if (!p) return res.status(404).json({ error: 'No patient with that ID' });
  res.json({ status: 'ok', patient: serializePatient(p) });
});

// POST /api/identify
// Called by the ESP32 when the sensor matches a scanned thumb against
// its stored templates — or by the dashboard's own Manual ID Lookup /
// demo scan control, using patient_id directly.
// Body: { "template_id": 7 }  OR  { "patient_id": "P1001" }
router.post('/identify', async (req, res) => {
  const { template_id, patient_id } = req.body || {};
  let p = null;
  if (template_id !== undefined) {
    p = await Patient.findOne({ fingerprintTemplateId: template_id }).lean();
  } else if (patient_id) {
    p = await Patient.findById(String(patient_id).toUpperCase()).lean();
  } else {
    return res.status(400).json({ error: 'template_id or patient_id is required' });
  }
  if (!p) return res.status(404).json({ error: 'No matching patient record' });
  res.json(serializePatient(p));
});

module.exports = router;

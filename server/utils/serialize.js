function serializePatient(doc) {
  if (!doc) return null;
  return {
    id: doc.id || doc._id,
    name: doc.name,
    age: doc.age,
    gender: doc.gender || '',
    blood: doc.blood || '',
    phone: doc.phone || '',
    emergency: doc.emergency || '',
    address: doc.address || '',
    allergies: doc.allergies || '',
    medications: doc.medications || '',
    history: doc.history || '',
    labSummary: doc.labSummary || '',
    labUpdatedAt: doc.labUpdatedAt || '',
    fingerprintTemplateId: doc.fingerprintTemplateId !== undefined ? doc.fingerprintTemplateId : null,
    registeredAt: doc.registeredAt,
    registeredBy: doc.registeredBy || 'Front Desk',
  };
}

function serializeQueue(doc) {
  if (!doc) return null;
  return {
    id: String(doc.id || doc._id),
    patientId: doc.patientId,
    patientName: doc.patientName,
    status: doc.status,
    priority: doc.priority,
    token: doc.token,
    checkedInAt: doc.checkedInAt,
  };
}

function serializeVisit(doc) {
  if (!doc) return null;
  return {
    id: String(doc.id || doc._id),
    patientId: doc.patientId,
    patientName: doc.patientName,
    date: doc.date,
    dateLabel: doc.dateLabel,
    doctor: doc.doctor || '',
    vitals: doc.vitals || '',
    conditions: doc.conditions || '',
    medications: doc.medications || '',
    notes: doc.notes || '',
  };
}

module.exports = { serializePatient, serializeQueue, serializeVisit };

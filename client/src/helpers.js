import React from 'react';
import { Icon } from './icons';

export function todayStr() {
  return new Date().toDateString();
}

export function deriveProviderName(username) {
  let base = username.replace(/^dr\.?\s*/i, '').replace(/[._-]+/g, ' ').trim();
  if (!base) base = username.trim();
  const parts = base.split(/\s+/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
  return 'Dr. ' + parts.join(' ');
}

export function findPatient(patients, id) {
  return patients.find((p) => p.id === id);
}

export function activeQueueFor(queue, patientId) {
  return queue.find((q) => q.patientId === patientId && q.status !== 'done');
}

export function StatusBadgeForPatient({ patient, queue }) {
  const q = activeQueueFor(queue, patient.id);
  if (!q) return <span className="badge badge-ready"><Icon name="check" />Ready</span>;
  if (q.priority === 'urgent') return <span className="badge badge-emergency"><Icon name="alert" />Emergency</span>;
  if (q.status === 'in-consult') return <span className="badge badge-consult">In consultation</span>;
  return <span className="badge badge-waiting"><Icon name="clock" />Waiting</span>;
}

export function QueueStatusBadge({ entry }) {
  if (entry.status === 'done') return <span className="badge badge-done"><Icon name="check" />Completed</span>;
  if (entry.priority === 'urgent') return <span className="badge badge-emergency"><Icon name="alert" />Emergency</span>;
  if (entry.status === 'in-consult') return <span className="badge badge-consult">In consultation</span>;
  return <span className="badge badge-waiting"><Icon name="clock" />Waiting</span>;
}

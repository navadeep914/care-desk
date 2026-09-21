import React from 'react';
import { Icon } from '../icons';
import { todayStr, QueueStatusBadge } from '../helpers';

export default function Dashboard({ patients, queue, visits, providerName, navigate, openWorkspace }) {
  const totalPatients = patients.length;
  const waiting = queue.filter((q) => q.status === 'waiting').length;
  const emergency = queue.filter((q) => q.priority === 'urgent' && q.status !== 'done').length;
  const processedToday = visits.filter((v) => v.dateLabel === todayStr()).length;

  const rows = [...queue].sort((a, b) => (a.token || 0) - (b.token || 0));

  return (
    <>
      <div className="eyebrow">CLINICAL OPERATIONS</div>
      <div className="page-head">
        <div>
          <h1>Good morning, {providerName}</h1>
          <div className="sub">Monitor today's clinical patient workflow.</div>
        </div>
        <div className="head-actions">
          <button className="btn btn-outline" onClick={() => navigate('queue')}><Icon name="users" />View Queue</button>
          <button className="btn btn-primary" onClick={() => navigate('scan')}><Icon name="fingerprint" />Scan Patient</button>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card c-neutral">
          <div className="label"><Icon name="users" />Today's Patients</div>
          <div className="num">{totalPatients}</div>
          <div className="cap">Registered in system</div>
        </div>
        <div className="stat-card c-teal">
          <div className="label"><Icon name="clock" />Waiting Queue</div>
          <div className="num">{waiting}</div>
          <div className="cap">Awaiting consultation</div>
        </div>
        <div className="stat-card c-danger">
          <div className="label"><Icon name="alert" />Emergency Cases</div>
          <div className="num">{emergency}</div>
          <div className="cap">Requiring immediate care</div>
        </div>
        <div className="stat-card c-dark">
          <div className="label"><Icon name="check" />Consultations</div>
          <div className="num">{processedToday}</div>
          <div className="cap">Processed today</div>
        </div>
      </div>

      <div className="card">
        <div className="table-card-head">
          <div className="table-card-title"><Icon name="pulse" />Today's Queue</div>
          <span className="chip-total">{rows.length} Patients Total</span>
        </div>
        {!rows.length ? (
          <div className="empty-state">
            <Icon name="clipboard" />
            <div>No patients registered yet. Register a patient to get started.</div>
            <button className="btn btn-primary" onClick={() => navigate('register')}><Icon name="userPlus" />Register Patient</button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Token</th><th>Patient</th><th>Patient ID</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((q) => (
                  <tr key={q.id}>
                    <td><span className="token-circle">{q.token || '–'}</span></td>
                    <td className="name-cell"><Icon name="person" />{q.patientName}</td>
                    <td className="id-cell">{q.patientId}</td>
                    <td><QueueStatusBadge entry={q} /></td>
                    <td><button className="btn btn-outline btn-sm" onClick={() => openWorkspace(q.patientId)}><Icon name="folder" />View Profile</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

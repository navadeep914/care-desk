import React, { useState } from 'react';
import { Icon } from '../icons';

export default function Consultations({ visits, openWorkspace }) {
  const [search, setSearch] = useState('');
  const q = search.toLowerCase();

  const rows = visits
    .filter((v) => !q || v.patientName.toLowerCase().includes(q) || v.patientId.toLowerCase().includes(q))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <div className="eyebrow">CLINICAL LOGS</div>
      <div className="page-head">
        <div>
          <h1>Consultation History</h1>
          <div className="sub">Review recent diagnostic and treatment consultation entries performed by clinical providers.</div>
        </div>
      </div>
      <div className="card">
        <div className="table-card-head">
          <div className="table-card-title">Completed Consultations</div>
          <input type="text" className="search-input" placeholder="Search patients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {!rows.length ? (
          <div className="empty-state"><Icon name="clipboard" /><div>No consultations recorded today.</div></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Consultation Date</th><th>Patient ID</th><th>Patient Name</th><th>Vital Signs</th><th>Clinical Notes</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((v) => (
                  <tr key={v.id}>
                    <td className="id-cell">{new Date(v.date).toLocaleString()}</td>
                    <td className="id-cell">{v.patientId}</td>
                    <td className="name-cell"><Icon name="person" />{v.patientName}</td>
                    <td>{v.vitals || '—'}</td>
                    <td>{v.notes || '—'}</td>
                    <td><button className="btn btn-outline btn-sm" onClick={() => openWorkspace(v.patientId)}><Icon name="folder" />View</button></td>
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

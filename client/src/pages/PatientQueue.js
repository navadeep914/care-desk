import React, { useState } from 'react';
import { Icon } from '../icons';

export default function PatientQueue({ queue, openWorkspace }) {
  const [search, setSearch] = useState('');
  const q = search.toLowerCase();

  const rows = queue
    .filter((x) => x.status !== 'done')
    .filter((x) => !q || x.patientName.toLowerCase().includes(q) || x.patientId.toLowerCase().includes(q))
    .sort((a, b) => {
      if ((a.priority === 'urgent') !== (b.priority === 'urgent')) return a.priority === 'urgent' ? -1 : 1;
      return (a.token || 0) - (b.token || 0);
    });

  return (
    <>
      <div className="eyebrow">TOKEN BOARD</div>
      <div className="page-head">
        <div>
          <h1>Waiting Queue</h1>
          <div className="sub">Emergency cases are automatically escalated to the top of the queue, followed by routine token numbers.</div>
        </div>
      </div>
      <div className="card">
        <div className="table-card-head">
          <div className="table-card-title">Active Clinic List</div>
          <input type="text" className="search-input" placeholder="Search patients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {!rows.length ? (
          <div className="empty-state">
            <Icon name="users" />
            <div>No patients waiting right now. Scanned or registered patients added to the queue will appear here.</div>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Priority</th><th>Token</th><th>Patient Name</th><th>Patient ID</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((qr) => (
                  <tr key={qr.id} className={`priority-row ${qr.priority === 'urgent' ? 'priority-emergency' : ''}`}>
                    <td>{qr.priority === 'urgent'
                      ? <span className="badge badge-emergency"><Icon name="alert" />Emergency</span>
                      : <span className="badge badge-ready"><Icon name="clock" />Routine</span>}</td>
                    <td><span className="token-circle">{qr.token || '–'}</span></td>
                    <td className="name-cell"><Icon name="person" />{qr.patientName}</td>
                    <td className="id-cell">{qr.patientId}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={() => openWorkspace(qr.patientId)}><Icon name="clipboard" />Start Consult</button></td>
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

import React, { useState } from 'react';
import { Icon } from '../icons';
import { StatusBadgeForPatient } from '../helpers';

export default function AllPatients({ patients, queue, navigate, openWorkspace }) {
  const [search, setSearch] = useState('');
  const q = search.toLowerCase();

  const rows = patients
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    .sort((a, b) => (a.registeredAt || '') < (b.registeredAt || '') ? 1 : -1);

  return (
    <>
      <div className="eyebrow">EHR REGISTRY</div>
      <div className="page-head">
        <div>
          <h1>Patient Registry</h1>
          <div className="sub">Browse and manage patient health records registered in the CareDesk system.</div>
        </div>
        <div className="head-actions">
          <button className="btn btn-primary" onClick={() => navigate('register')}><Icon name="userPlus" />Register Patient</button>
        </div>
      </div>
      <div className="card">
        <div className="table-card-head">
          <div className="table-card-title">Active Health Records</div>
          <input type="text" className="search-input" placeholder="Search patients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {!patients.length ? (
          <div className="empty-state">
            <Icon name="idcard" />
            <div>No patients enrolled yet. Register your first patient to get started.</div>
            <button className="btn btn-primary" onClick={() => navigate('register')}><Icon name="userPlus" />Register Patient</button>
          </div>
        ) : !rows.length ? (
          <div className="empty-state"><Icon name="search" /><div>No patients match your search.</div></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient ID</th><th>Patient Name</th><th>Demographics</th><th>Blood Group</th><th>Contact</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td className="id-cell">{p.id}</td>
                    <td className="name-cell"><Icon name="person" />{p.name}</td>
                    <td>{[p.age ? `${p.age} Y` : '', p.gender].filter(Boolean).join(' / ')}</td>
                    <td>{p.blood ? <span className="blood"><Icon name="drop" />{p.blood}</span> : '—'}</td>
                    <td>{p.phone || '—'}</td>
                    <td><StatusBadgeForPatient patient={p} queue={queue} /></td>
                    <td><button className="btn btn-outline btn-sm" onClick={() => openWorkspace(p.id)}><Icon name="folder" />View Profile</button></td>
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

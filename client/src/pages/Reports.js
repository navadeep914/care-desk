import React, { useState } from 'react';
import { Icon } from '../icons';

export default function Reports({ patients, openWorkspace }) {
  const [search, setSearch] = useState('');
  const q = search.toLowerCase();

  const rows = patients
    .filter((p) => p.labSummary)
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
    .sort((a, b) => (b.labUpdatedAt || '') < (a.labUpdatedAt || '') ? -1 : 1);

  return (
    <>
      <div className="eyebrow">DIAGNOSTIC LOGS</div>
      <div className="page-head">
        <div>
          <h1>Lab Reports</h1>
          <div className="sub">Access clinical findings, diagnostic tests, and lab results uploaded to patient files.</div>
        </div>
      </div>
      <div className="card">
        <div className="table-card-head">
          <div className="table-card-title">Diagnostic Attachments</div>
          <input type="text" className="search-input" placeholder="Search patients…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {!rows.length ? (
          <div className="empty-state"><Icon name="file" /><div>No lab findings uploaded yet. Add one from a patient's workspace page.</div></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient ID</th><th>Patient Name</th><th>Report Summary / Lab Findings</th><th>Last Updated</th><th>Action</th></tr></thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td className="id-cell">{p.id}</td>
                    <td className="name-cell"><Icon name="person" />{p.name}</td>
                    <td>{p.labSummary}</td>
                    <td className="id-cell">{p.labUpdatedAt ? new Date(p.labUpdatedAt).toLocaleDateString() : '—'}</td>
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

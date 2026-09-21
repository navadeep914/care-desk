import React from 'react';
import { Icon, LogoMark } from './icons';

export const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { key: 'register', label: 'Register Patient', icon: 'userPlus' },
  { key: 'scan', label: 'Scan Patient', icon: 'fingerprint' },
  { key: 'queue', label: 'Patient Queue', icon: 'users' },
  { key: 'patients', label: 'All Patients', icon: 'idcard' },
  { key: 'consultations', label: 'Consultations', icon: 'clipboard' },
  { key: 'reports', label: 'Reports', icon: 'file' },
  { key: 'settings', label: 'Settings', icon: 'gear' },
];

export default function Sidebar({ view, onNavigate, providerName, onLogout }) {
  return (
    <aside id="sidebar">
      <div className="side-logo">
        <div className="mark"><LogoMark size={17} /></div>
        <div className="word">CareDesk</div>
      </div>
      <nav className="side-nav">
        {NAV.map((n) => (
          <button
            key={n.key}
            className={view === n.key ? 'active' : ''}
            onClick={() => onNavigate(n.key)}
          >
            <Icon name={n.icon} />
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
      <div className="side-foot">
        <div className="box">
          <div className="pname">{providerName}</div>
          <button className="logout" onClick={onLogout}>↩ Logout</button>
        </div>
      </div>
    </aside>
  );
}

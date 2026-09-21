import React, { useState, useEffect, useCallback, useRef } from 'react';
import Login from './Login';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import RegisterPatient from './pages/RegisterPatient';
import ScanPatient from './pages/ScanPatient';
import PatientQueue from './pages/PatientQueue';
import AllPatients from './pages/AllPatients';
import Consultations from './pages/Consultations';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Workspace from './pages/Workspace';
import { api } from './api';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [justSignedOut, setJustSignedOut] = useState(false);
  const [providerName, setProviderName] = useState('Dr. Reddy');
  const [providerUsername, setProviderUsername] = useState('dr.reddy');

  const [view, setView] = useState('dashboard');
  const [currentPatientId, setCurrentPatientId] = useState(null);
  const [scanSimId, setScanSimId] = useState('');

  const [patients, setPatients] = useState([]);
  const [queue, setQueue] = useState([]);
  const [visits, setVisits] = useState([]);
  const [serverConnected, setServerConnected] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const toastTimer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(''), 2200);
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      const [p, q, v] = await Promise.all([api.getPatients(), api.getQueue(), api.getVisits()]);
      setPatients(p);
      setQueue(q);
      setVisits(v);
      setServerConnected(true);
    } catch (err) {
      setServerConnected(false);
      toast('Could not reach the CareDesk server');
    }
  }, [toast]);

  useEffect(() => {
    if (!loggedIn) return;
    refreshAll();
    const id = setInterval(refreshAll, 6000);
    return () => clearInterval(id);
  }, [loggedIn, refreshAll]);

  function navigate(nextView, simId) {
    setView(nextView);
    setCurrentPatientId(null);
    if (nextView === 'scan') setScanSimId(simId || '');
  }
  function openWorkspace(patientId) {
    setCurrentPatientId(patientId);
    setView('workspace');
  }
  function handleLogin({ providerUsername: u, providerName: n }) {
    setProviderUsername(u);
    setProviderName(n);
    setLoggedIn(true);
    setView('dashboard');
  }
  function handleLogout() {
    setLoggedIn(false);
    setJustSignedOut(true);
  }

  if (!loggedIn) {
    return (
      <Login
        signedOut={justSignedOut}
        onDismissBanner={() => setJustSignedOut(false)}
        onLogin={handleLogin}
      />
    );
  }

  let page = null;
  if (view === 'dashboard') {
    page = <Dashboard patients={patients} queue={queue} visits={visits} providerName={providerName} navigate={navigate} openWorkspace={openWorkspace} />;
  } else if (view === 'register') {
    page = <RegisterPatient patients={patients} onRegistered={refreshAll} navigate={navigate} toast={toast} providerName={providerName} />;
  } else if (view === 'scan') {
    page = <ScanPatient patients={patients} initialSimId={scanSimId} openWorkspace={openWorkspace} />;
  } else if (view === 'queue') {
    page = <PatientQueue queue={queue} openWorkspace={openWorkspace} />;
  } else if (view === 'patients') {
    page = <AllPatients patients={patients} queue={queue} navigate={navigate} openWorkspace={openWorkspace} />;
  } else if (view === 'consultations') {
    page = <Consultations visits={visits} openWorkspace={openWorkspace} />;
  } else if (view === 'reports') {
    page = <Reports patients={patients} openWorkspace={openWorkspace} />;
  } else if (view === 'settings') {
    page = <Settings providerName={providerName} providerUsername={providerUsername} serverConnected={serverConnected} />;
  } else if (view === 'workspace') {
    page = (
      <Workspace
        patientId={currentPatientId}
        patients={patients}
        queue={queue}
        visits={visits}
        providerName={providerName}
        toast={toast}
        refreshAll={refreshAll}
        navigate={navigate}
      />
    );
  }

  return (
    <div id="app-shell" className="active">
      <Sidebar view={view} onNavigate={navigate} providerName={providerName} onLogout={handleLogout} />
      <div id="content">
        {page}
        <footer className="appfoot">CareDesk · MERN Stack · All patient records are fictional</footer>
      </div>
      <div className={`toast ${toastMsg ? 'show' : ''}`}>{toastMsg}</div>
    </div>
  );
}

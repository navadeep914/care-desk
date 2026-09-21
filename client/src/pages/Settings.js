import React from 'react';
import { Icon } from '../icons';

export default function Settings({ providerName, providerUsername, serverConnected }) {
  return (
    <>
      <div className="eyebrow">PORTAL PARAMETERS</div>
      <div className="page-head">
        <div>
          <h1>System Settings</h1>
          <div className="sub">Manage clinical preferences, provider properties, and system connection integrations.</div>
        </div>
      </div>

      <div className="settings-grid">
        <div className="card">
          <div className="table-card-title" style={{ marginBottom: 6 }}><Icon name="person" />Provider Profile</div>
          <div className="kv-row"><span className="k">Provider name</span><span className="v">{providerName}</span></div>
          <div className="kv-row"><span className="k">Provider username</span><span className="v v-accent">{providerUsername}</span></div>
          <div className="kv-row"><span className="k">Clinical role</span><span className="v">Attending Physician</span></div>
        </div>
        <div className="card">
          <div className="table-card-title" style={{ marginBottom: 6 }}><Icon name="gear" />EHR Parameters</div>
          <div className="kv-row"><span className="k">CareDesk EHR version</span><span className="v">v2.4.1 (MERN)</span></div>
          <div className="kv-row"><span className="k">Database connection</span><span className="v v-ok">{serverConnected ? 'MongoDB (Connected)' : 'Disconnected — check the server'}</span></div>
          <div className="kv-row"><span className="k">Biometric integration</span><span className="v v-accent">Simulated Match Engine</span></div>
          <div className="kv-row"><span className="k">Session protection</span><span className="v v-ok">CSRF/SSL Enabled</span></div>
        </div>
      </div>

      <div className="card">
        <div className="table-card-title" style={{ marginBottom: 6 }}><Icon name="fingerprint" />Connect a real fingerprint scanner</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 4px' }}>
          How your ESP32 + R307/AS608 sensor talks to this dashboard's Express/MongoDB backend.
        </p>
        <div className="flow-diagram">
          <div className="flow-node">Thumb on R307 sensor</div><span className="flow-arrow">→</span>
          <div className="flow-node">ESP32 matches template</div><span className="flow-arrow">→</span>
          <div className="flow-node">Wi-Fi / HTTP request</div><span className="flow-arrow">→</span>
          <div className="flow-node">Express API</div><span className="flow-arrow">→</span>
          <div className="flow-node">MongoDB lookup by template</div><span className="flow-arrow">→</span>
          <div className="flow-node">Record shown here</div>
        </div>
        <pre className="code-block">{`POST http://YOUR-SERVER:5000/api/enroll
Body: { "patient_id": "P1001", "template_id": 7 }

POST http://YOUR-SERVER:5000/api/identify
Body: { "template_id": 7 }
# returns the matched patient record as JSON`}</pre>
        <div className="field-hint">
          This dashboard's Scan &amp; Register pages simulate the sensor for demo purposes. Point your ESP32's HTTP client at these two routes to run against real hardware.
        </div>
      </div>
    </>
  );
}

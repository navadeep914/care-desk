import React from 'react';
import { Icon } from './icons';

export default function ScanCard({
  eyebrow, title, subtitle, phase, onCapture, captureLabel,
  requirePatients, patients, showDemoSelect, scanSimId, onSimChange,
  successSub, resultNode, onBack,
}) {
  let statusTitle = 'Ready to scan';
  let statusSub = 'Awaiting scan request initialization…';
  let btnLabel = captureLabel;
  let btnClass = 'btn-primary';

  if (phase === 'scanning') {
    statusTitle = 'Scanning Biometrics…';
    statusSub = 'Validating fingerprint sequence, please keep finger flat on sensor…';
    btnLabel = 'Scanning…';
    btnClass = 'scanning';
  } else if (phase === 'success') {
    statusTitle = 'Validation Successful';
    statusSub = successSub || 'Biometric data matches a registered patient file.';
  } else if (phase === 'fail') {
    statusTitle = 'No Match Found';
    statusSub = 'Biometric data does not match any registered patient file.';
  }

  const disabled = phase === 'scanning' || (requirePatients && patients.length === 0);

  return (
    <div className="card">
      <div className="scan-card-head">
        <div className="pulse-icon"><Icon name="pulse" /></div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {showDemoSelect && (
        <div className="scan-demo-box">
          Demo control — simulate thumb for:{' '}
          <select value={scanSimId} onChange={(e) => onSimChange(e.target.value)} disabled={!patients.length}>
            {patients.length ? (
              <>
                <option value="">— none (simulate no match) —</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                ))}
              </>
            ) : (
              <option>No patients registered</option>
            )}
          </select>
        </div>
      )}

      <div className="scan-ring-wrap">
        <div className={`scan-ring ${phase === 'scanning' ? 'scanning' : phase === 'success' ? 'success' : phase === 'fail' ? 'fail' : ''}`}>
          <Icon name={phase === 'fail' ? 'alert' : 'fingerprint'} />
        </div>
        <div className="scan-status-title">{statusTitle}</div>
        <div className="scan-status-sub">{statusSub}</div>
        <button className={`btn btn-primary scan-action-btn ${btnClass}`} onClick={onCapture} disabled={disabled}>
          <Icon name="fingerprint" />{btnLabel}
        </button>
        {requirePatients && !patients.length && (
          <div className="field-hint" style={{ marginTop: 8 }}>No patients registered yet — register one first.</div>
        )}
      </div>

      {resultNode}

      {onBack && (
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to details</button>
        </div>
      )}
    </div>
  );
}

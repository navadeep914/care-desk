import React, { useState } from 'react';
import { Icon, LogoMark } from './icons';
import { deriveProviderName } from './helpers';

export default function Login({ signedOut, onDismissBanner, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function submit() {
    const u = username.trim();
    const p = password.trim();
    if (!u || !p) {
      setError(true);
      return;
    }
    setError(false);
    onLogin({ providerUsername: u, providerName: deriveProviderName(u) });
  }

  return (
    <div id="login-screen" className="active">
      <div className="login-wrap">
        {signedOut && (
          <div className="signed-out-banner">
            <span>You have been signed out.</span>
            <button onClick={onDismissBanner} aria-label="Dismiss">×</button>
          </div>
        )}
        <div className="login-card">
          <div className="login-logo">
            <LogoMark size={28} />
          </div>
          <h1>CareDesk</h1>
          <div className="login-sub">EHR Clinical Environment</div>

          <div className="login-field">
            <label>👤 USERNAME</label>
            <input
              type="text"
              placeholder="e.g. dr.reddy"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            />
          </div>
          <div className="login-field">
            <label>🔒 PASSWORD</label>
            <input
              type="text"
              placeholder="••••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
            />
          </div>
          {error && <div className="login-error" style={{ display: 'block' }}>Please enter both a username and password.</div>}
          <button className="btn-signin" onClick={submit}>Sign in</button>

          <div className="authorized-note">
            <Icon name="shield" />
            <div>
              <b>Authorized Personnel Only</b>
              <span>Sign in using your administrative credentials to access clinical workspaces and patient data.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

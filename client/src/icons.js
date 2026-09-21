import React from 'react';

// Raw inner-SVG markup for each icon, reused from the original design.
// Static, developer-authored strings only (never user input).
const PATHS = {
  grid: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  userPlus: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M19 8v6M16 11h6"/>',
  fingerprint: '<path d="M12 3a9 9 0 0 0-9 9c0 2 .3 3.4 1 5M12 3a9 9 0 0 1 9 9c0 3-.5 5-1.5 7M7 21c-1-2-1.5-4-1.5-6a6.5 6.5 0 0 1 13 0c0 1 0 2-.3 3M9 20a11 11 0 0 1-1-7 4 4 0 0 1 8 0c0 2.5-.5 4-1.3 5.5M12 9a3.5 3.5 0 0 0-3.5 3.5c0 2 .5 3.5 1.2 5"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15.8 14.2c2.6.4 4.7 2.6 4.7 5.8"/>',
  idcard: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M5 16.5c.5-1.6 1.6-2.5 3-2.5s2.5.9 3 2.5M14 9h5M14 13h5M14 17h3"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.3" width="6" height="3.4" rx="1"/><path d="M8.5 11h7M8.5 15h7"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M8.5 12h7M8.5 16h7"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13.5c.1-.5.1-1 0-1.5l1.9-1.4-2-3.4-2.2.6a7.7 7.7 0 0 0-1.3-.8L15.4 4h-4l-.4 2.9c-.5.2-.9.5-1.3.8l-2.2-.6-2 3.4L7.4 12c-.1.5-.1 1 0 1.5l-1.9 1.4 2 3.4 2.2-.6c.4.3.8.6 1.3.8l.4 2.9h4l.4-2.9c.5-.2.9-.5 1.3-.8l2.2.6 2-3.4-1.9-1.4z"/>',
  pulse: '<path d="M3 12h4l2 6 4-14 2 8h6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 9.5v4.5M12 17h.01"/>',
  check: '<path d="M4 12.5l5 5L20 7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5"/>',
  personCheck: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5"/><path d="M9 8l2 2 4-4" stroke="#fff"/>',
  folder: '<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
  tag: '<path d="M12 3h7v7l-9 9-7-7z"/><circle cx="15.5" cy="7.5" r="1"/>',
  pill: '<rect x="3.5" y="9" width="17" height="8" rx="4" transform="rotate(-25 12 12)"/><path d="M9 9.5l3 6" stroke="#fff" stroke-width="1.4"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/>',
  drop: '<path d="M12 3S5 11 5 15.5A7 7 0 0 0 19 15.5C19 11 12 3 12 3z"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z"/>',
  shieldCheck: '<path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z"/><path d="M8.5 12l2.3 2.3L16 9" stroke="#fff"/>',
};

export function Icon({ name, className = 'icon', ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      dangerouslySetInnerHTML={{ __html: PATHS[name] || '' }}
      {...rest}
    />
  );
}

export function LogoMark({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
        fill="#fff"
      />
      <path d="M3 12h4l1.5-3L11 15l2-6 1.5 3H21" stroke="#128C74" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

export default Icon;
